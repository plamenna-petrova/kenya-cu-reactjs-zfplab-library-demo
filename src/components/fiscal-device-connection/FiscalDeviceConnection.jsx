/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { Formik } from "formik";
import { Paragraph } from '../layout/typography-elements/TypographyElements';
import {
  BAUD_RATES,
  FISCAL_DEVICE_CONNECTION_SETTINGS_KEY,
  SELECT_MENU_ITEM_HEIGHT,
  SELECT_MENU_ITEM_PADDING_TOP,
  SERIAL_PORT_CONNECTION,
  TCP_CONNECTION,
  SEARCHING_FOR_FISCAL_DEVICE_LOADING_MESSAGE,
  CONNECTING_TO_FISCAL_DEVICE_LOADING_MESSAGE,
  FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE
} from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useFP } from '../../hooks/useFP';
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { setFiscalDeviceConnectionState } from '../../store/slices/zfpConnectionSlice';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import FiscalDeviceConnectionCard from '../layout/zfp-connection-card/ZFPConnectionCard';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import UsbIcon from '@mui/icons-material/Usb';
import LanIcon from '@mui/icons-material/Lan';
import SearchIcon from '@mui/icons-material/Search';
import CableIcon from '@mui/icons-material/Cable';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import CloseIcon from '@mui/icons-material/Close';

const FiscalDeviceConnectionTabPanel = (props) => {
  const { children, value, index, ...restProps } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fiscal-device-connection-tabpanel-${index}`}
      aria-labelledby={`fiscal-device-connection-tab-${index}`}
      {...restProps}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

FiscalDeviceConnectionTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `fiscal-device-connection-tab-${index}`,
    'aria-controls': `fiscal-device-connection-tabpanel-${index}`,
  };
}

const FiscalDeviceConnection = ({ initialSerialPortOrUSBConnectionFormValues, initialLANOrWifiConnectionFormValues, fiscalDeviceConnectionHandler }) => {
  const [fiscalDeviceConnectionTabValue, setFiscalDeviceConnectionTabValue] = useState(0);
  const [serialPorts, setSerialPorts] = useState([]);
  const [serialPortOrUSBConnectionFormValues, setSerialPortOrUSBConnectionFormValues] = useState(initialSerialPortOrUSBConnectionFormValues);
  const [serialPortOrUSBConnectionFormTouched, setSerialPortOrUSBConnectionFormTouched] = useState({});
  const [serialPortOrUSBConnectionFormErrors, setSerialPortOrUSBConnectionFormErrors] = useState({});
  const [lanOrWifiConnectionFormValues, setLANOrWiFiConnectionFormValues] = useState(initialLANOrWifiConnectionFormValues);
  const [lanOrWifiConnectionFormTouched, setLANOrWifiConnectionFormTouched] = useState({});
  const [lanOrWifiConnectionFormErrors, setLANOrWifiConnectionFormErrors] = useState({});
  const [serialPortOrUSBConnectionState, setSerialPortOrUSBConnectionState] = useState(null);
  const [lanOrWifiConnectionState, setLanOrWifiConnectionState] = useState(null);
  const isMobileScreen = useMediaQuery('(max-width:480px)');
  const dispatch = useDispatch();
  const fp = useFP();
  
  const handleFiscalDeviceConnectionTabChange = (_, newValue) => {
    setFiscalDeviceConnectionTabValue(newValue);
  };

  const serialPortOrUSBConnectionValidationSchema = Yup.object().shape({
    serialPort: Yup.string().required(),
    baudRate: Yup.number().required()
  });

  const lanOrWifiConnectionValidationSchema = Yup.object().shape({
    fiscalDeviceIPAddress: Yup
      .string()
      .required("The fiscal device IP address is required")
      .matches(
        /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
        "The fiscal device password must be a valid IP address"
      ),
    lanOrWifiPassword: Yup.string().required("The network password is required")
  });

  const handleFindDevice = async (setFieldValue, setTouched, setErrors) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        const foundDeviceSettings = await fp.ServerFindDevice();

        if (foundDeviceSettings !== null) {
          const { serialPort, baudRate } = foundDeviceSettings;

          if (!serialPorts.includes(serialPort)) {
            const updatedSerialPorts = [...serialPorts, serialPort];

            const comPorts = updatedSerialPorts.filter(serialPort => serialPort.startsWith("COM"));
            const otherPorts = updatedSerialPorts.filter(serialPort => !serialPort.startsWith("COM"));

            const sortedCOMPorts = comPorts.sort((a, b) => {
              const firstCOMPortNumberToCompare = parseInt(a.replace(/\D/g, ""), 10);
              const secondCOMPortNumberToCompare = parseInt(b.replace(/\D/g, ""), 10);
              return firstCOMPortNumberToCompare - secondCOMPortNumberToCompare;
            });

            setSerialPorts([...sortedCOMPorts, ...otherPorts]);
          }

          setFieldValue("serialPort", serialPort);
          setFieldValue("baudRate", baudRate);
          setTouched({}, false);
          setErrors({});

          setSerialPortOrUSBConnectionState({
            severity: 'success',
            message: `A fiscal device has been found on ${serialPort} and baud rate: ${baudRate}`
          });
        } else {
          setSerialPortOrUSBConnectionState({
            severity: 'warning',
            message: `A fiscal device couldn't be found`
          });
        }
      } catch (error) {
        console.error(error);

        setSerialPortOrUSBConnectionState({
          severity: 'error',
          message: 'An error occurred while trying to find a fiscal device'
        });
      }
    }, SEARCHING_FOR_FISCAL_DEVICE_LOADING_MESSAGE);
  }

  const handleFiscalDeviceConnectionFormSubmit = async (fiscalDeviceConnectionSettingsFormData, setSubmitting, connectionType) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fiscalDeviceConnectionHandler(fiscalDeviceConnectionSettingsFormData, connectionType);

        let connectedFiscalDeviceSettings = {};

        if (connectionType === SERIAL_PORT_CONNECTION) {
          connectedFiscalDeviceSettings = {
            connectionType,
            serialPort: fiscalDeviceConnectionSettingsFormData.serialPort,
            baudRate: fiscalDeviceConnectionSettingsFormData.baudRate,
          };
        } else {
          connectedFiscalDeviceSettings = {
            connectionType,
            fiscalDeviceIPAddress: fiscalDeviceConnectionSettingsFormData.fiscalDeviceIPAddress,
            lanOrWifiPassword: fiscalDeviceConnectionSettingsFormData.lanOrWifiPassword
          };
        }

        localStorage.setItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY, JSON.stringify(connectedFiscalDeviceSettings));
      } catch (error) {
        const fiscalDevicefailedConnectionStatus = {
          severity: 'error',
          message: `Couldn't connect to a fiscal device`,
        }

        if (connectionType == SERIAL_PORT_CONNECTION) {
          setSerialPortOrUSBConnectionState(fiscalDevicefailedConnectionStatus);
        } else {
          setLanOrWifiConnectionState(fiscalDevicefailedConnectionStatus);
        }

        localStorage.removeItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY);
        toast.error(handleZFPLabServerError(error));
        dispatch(setFiscalDeviceConnectionState({ isConnected: false, connectionStateMessage: FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE }));
      } finally {
        setSubmitting(false);
      }
    }, CONNECTING_TO_FISCAL_DEVICE_LOADING_MESSAGE);
  }

  const clearSerialPortOrUSBConnectionStateAlert = () => {
    setSerialPortOrUSBConnectionState(null);
  }

  const clearLANOrWifiConnectionStateAlert = () => {
    setLanOrWifiConnectionState(null);
  }

  const FiscalDeviceConnectionMenuProps = {
    PaperProps: {
      style: {
        maxHeight: SELECT_MENU_ITEM_HEIGHT * 4.5 + SELECT_MENU_ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    let sampleSerialPorts = [];

    for (let i = 0; i < 15; i++) {
      sampleSerialPorts.push(`COM${i + 1}`);
    }

    setSerialPorts([...sampleSerialPorts]);
  }, []);

  return (
    <FiscalDeviceConnectionCard>
      <Tabs
        value={fiscalDeviceConnectionTabValue}
        onChange={handleFiscalDeviceConnectionTabChange}
        aria-label="Fiscal Device Connection Tabs"
        variant="fullWidth"
      >
        <Tab label={`${isMobileScreen ? 'Serial Port / USB' : 'Connection by Serial Port / USB'}`} icon={<UsbIcon />} iconPosition="start" {...a11yProps(0)} />
        <Tab label={`${isMobileScreen ? 'LAN/WiFi' : 'Connection by LAN / WiFi'}`} icon={<LanIcon />} iconPosition="start" {...a11yProps(1)} />
      </Tabs>
      <CardContent>
        <FiscalDeviceConnectionTabPanel value={fiscalDeviceConnectionTabValue} index={0}>
          <Formik
            initialValues={serialPortOrUSBConnectionFormValues}
            validationSchema={serialPortOrUSBConnectionValidationSchema}
            onSubmit={(values, { setSubmitting }) => handleFiscalDeviceConnectionFormSubmit(values, setSubmitting, SERIAL_PORT_CONNECTION)}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setTouched,
              setErrors
            }) => {
              useEffect(() => {
                setSerialPortOrUSBConnectionFormValues(values);
                setSerialPortOrUSBConnectionFormTouched(touched);
                setSerialPortOrUSBConnectionFormErrors(errors);
              }, [values, touched, errors]);

              useEffect(() => {
                setTouched(serialPortOrUSBConnectionFormTouched);
                setErrors(serialPortOrUSBConnectionFormErrors);
              }, [setTouched, setErrors]);

              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>Serial Port</Paragraph>
                        <Autocomplete
                          name="serialPort"
                          size="small"
                          value={values.serialPort}
                          onChange={(_, newValue) => {
                            setFieldValue("serialPort", newValue || "");
                          }}
                          inputValue={values.serialPort}
                          onInputChange={(_, newInputValue) => {
                            setFieldValue("serialPort", newInputValue || "");
                          }}
                          onBlur={(event) => {
                            if (event.relatedTarget && event.relatedTarget.getAttribute("role") === "combobox") {
                              return;
                            }

                            handleBlur(event);
                          }}
                          options={serialPorts}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="serialPort"
                              onBlur={handleBlur}
                              error={Boolean(touched.serialPort && errors.serialPort)}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>Baud Rate</Paragraph>
                        <Select
                          name="baudRate"
                          value={values.baudRate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          MenuProps={FiscalDeviceConnectionMenuProps}
                        >
                          {BAUD_RATES.map((baudRate, index) => (
                            <MenuItem key={index} value={baudRate}>{baudRate}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {serialPortOrUSBConnectionState &&
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 0 }}>
                        <Collapse in={!!serialPortOrUSBConnectionState} sx={{ width: '100%' }}>
                          <Alert
                            variant="outlined"
                            severity={serialPortOrUSBConnectionState.severity}
                            action={
                              <IconButton
                                aria-label="Close Serial Port Or USB Connection Status Alert"
                                color="inherit"
                                size="small"
                                onClick={clearSerialPortOrUSBConnectionStateAlert}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                          >
                            {serialPortOrUSBConnectionState.message}
                          </Alert>
                        </Collapse>
                      </Box>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'center', ml: { xs: '0px', sm: '36px' } }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<SearchIcon />}
                          onClick={() => handleFindDevice(setFieldValue, setTouched, setErrors)}
                        >
                          Find
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<CableIcon />}>
                          Connect
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </form>
              )
            }}
          </Formik>
        </FiscalDeviceConnectionTabPanel>
        <FiscalDeviceConnectionTabPanel value={fiscalDeviceConnectionTabValue} index={1}>
          <Formik
            initialValues={lanOrWifiConnectionFormValues}
            validationSchema={lanOrWifiConnectionValidationSchema}
            onSubmit={(values, { setSubmitting }) => handleFiscalDeviceConnectionFormSubmit(values, setSubmitting, TCP_CONNECTION)}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setTouched,
              setErrors
            }) => {
              useEffect(() => {
                setLANOrWiFiConnectionFormValues(values);
                setLANOrWifiConnectionFormTouched(touched);
                setLANOrWifiConnectionFormErrors(errors);
              }, [values, touched, errors]);

              useEffect(() => {
                setTouched(lanOrWifiConnectionFormTouched)
                setErrors(lanOrWifiConnectionFormErrors);
              }, [setTouched, setErrors]);

              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>Fiscal Device IP Address</Paragraph>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="fiscalDeviceIPAddress"
                          variant="outlined"
                          placeholder="Example - 192.168.0.1"
                          onBlur={handleBlur}
                          value={values.fiscalDeviceIPAddress}
                          onChange={handleChange}
                          helperText={touched.fiscalDeviceIPAddress && errors.fiscalDeviceIPAddress}
                          error={Boolean(touched.fiscalDeviceIPAddress && errors.fiscalDeviceIPAddress)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph>Network Password</Paragraph>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="lanOrWifiPassword"
                          variant="outlined"
                          placeholder="Example - 1234"
                          onBlur={handleBlur}
                          value={values.lanOrWifiPassword}
                          onChange={handleChange}
                          helperText={touched.lanOrWifiPassword && errors.lanOrWifiPassword}
                          error={Boolean(touched.lanOrWifiPassword && errors.lanOrWifiPassword)}
                        />
                      </FormControl>
                    </Grid>
                    {lanOrWifiConnectionState &&
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 0 }}>
                        <Collapse in={!!lanOrWifiConnectionState} sx={{ width: '100%' }}>
                          <Alert
                            variant="outlined"
                            severity={lanOrWifiConnectionState.severity}
                            action={
                              <IconButton
                                aria-label="Close LAN Or Wifi Connection Status Alert"
                                color="inherit"
                                size="small"
                                onClick={clearLANOrWifiConnectionStateAlert}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                          >
                            {lanOrWifiConnectionState.message}
                          </Alert>
                        </Collapse>
                      </Box>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type="submit" variant="contained" startIcon={<NetworkPingIcon />}>
                        Connect
                      </Button>
                    </Box>
                  </Grid>
                </form>
              )
            }}
          </Formik>
        </FiscalDeviceConnectionTabPanel>
      </CardContent>
    </FiscalDeviceConnectionCard>
  )
}

FiscalDeviceConnection.propTypes = {
  initialSerialPortOrUSBConnectionFormValues: PropTypes.object,
  initialLANOrWifiConnectionFormValues: PropTypes.object,
  fiscalDeviceConnectionHandler: PropTypes.func
}

export default FiscalDeviceConnection;