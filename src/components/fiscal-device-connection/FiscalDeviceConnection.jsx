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
  FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE,
  REQUIRED_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE,
  INVALID_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE,
  REQUIRED_NETWORK_PASSWORD_ERROR_MESSAGE,
  FISCAL_DEVICE_NOT_FOUND_WARNING_MESSAGE,
  FISCAL_DEVICE_NOT_FOUND_ERROR_MESSAGE,
  NOT_CONNECTED_TO_FISCAL_DEVICE_ERROR_MESSAGE,
  SERIAL_PORT_OR_USB_CONNECTION_MOBILE_TAB_LABEL,
  SERIAL_PORT_OR_USB_CONNECTION_TAB_LABEL,
  LAN_OR_WIFI_CONNECTION_MOBILE_TAB_LABEL,
  LAN_OR_WIFI_CONNECTION_TAB_LABEL
} from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useFP } from '../../hooks/useFP';
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { getInitialFiscalDeviceConnectionFormValues, getConfiguredFiscalDeviceConnectionSettings, updateSerialPorts } from '../../utils/connectionUtils';
import { setFiscalDeviceConnectionState, setIsSearchingForFiscalDevice } from '../../store/slices/zfpConnectionSlice';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import FiscalDeviceConnectionCard from '../layout/zfp-connection-card/ZFPConnectionCard';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

const FiscalDeviceConnection = ({ fiscalDeviceConnectionHandler }) => {
  const [fiscalDeviceConnectionTabValue, setFiscalDeviceConnectionTabValue] = useState(0);
  const [serialPorts, setSerialPorts] = useState([]);
  const [serialPortOrUSBConnectionFormValues, setSerialPortOrUSBConnectionFormValues] = useState(getInitialFiscalDeviceConnectionFormValues(SERIAL_PORT_CONNECTION));
  const [serialPortOrUSBConnectionFormTouched, setSerialPortOrUSBConnectionFormTouched] = useState({});
  const [serialPortOrUSBConnectionFormErrors, setSerialPortOrUSBConnectionFormErrors] = useState({});
  const [lanOrWifiConnectionFormValues, setLANOrWiFiConnectionFormValues] = useState(getInitialFiscalDeviceConnectionFormValues(TCP_CONNECTION));
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
      .required(REQUIRED_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE)
      .matches(
        /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
        INVALID_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE
      ),
    lanOrWifiPassword: Yup.string().required(REQUIRED_NETWORK_PASSWORD_ERROR_MESSAGE)
  });

  const handleFindDeviceClick = async (setFieldValue, setTouched, setErrors) => {
    dispatch(setIsSearchingForFiscalDevice(true));

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        const foundDeviceSettings = await fp.ServerFindDevice();

        if (foundDeviceSettings !== null) {
          const { serialPort, baudRate } = foundDeviceSettings;

          if (!serialPorts.includes(serialPort)) {
            const updatedSerialPorts = updateSerialPorts(serialPorts, serialPort);
            setSerialPorts(updatedSerialPorts);
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
            message: FISCAL_DEVICE_NOT_FOUND_WARNING_MESSAGE
          });
        }
      } catch (error) {
        console.error(error);

        setSerialPortOrUSBConnectionState({
          severity: 'error',
          message: FISCAL_DEVICE_NOT_FOUND_ERROR_MESSAGE
        });
      } finally {
        dispatch(setIsSearchingForFiscalDevice(false));
      }
    }, SEARCHING_FOR_FISCAL_DEVICE_LOADING_MESSAGE);
  }

  const handleFiscalDeviceConnectionFormSubmit = async (fiscalDeviceConnectionSettingsFormData, setSubmitting, connectionType) => {
    dispatch(setIsSearchingForFiscalDevice(true));

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
          message: NOT_CONNECTED_TO_FISCAL_DEVICE_ERROR_MESSAGE,
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
        dispatch(setIsSearchingForFiscalDevice(false));
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
    let serialPortsOptions = [];

    for (let i = 0; i < 15; i++) {
      serialPortsOptions.push(`COM${i + 1}`);
    }

    const configuredFiscalDeviceConnectionSettings = getConfiguredFiscalDeviceConnectionSettings();

    if (configuredFiscalDeviceConnectionSettings.connectionType === SERIAL_PORT_CONNECTION &&
      !serialPortsOptions.includes(configuredFiscalDeviceConnectionSettings.serialPort)) {
      serialPortsOptions = updateSerialPorts(serialPortsOptions, configuredFiscalDeviceConnectionSettings.serialPort);
    }

    setSerialPorts(serialPortsOptions);
  }, []);

  return (
    <FiscalDeviceConnectionCard>
      <Tabs
        value={fiscalDeviceConnectionTabValue}
        onChange={handleFiscalDeviceConnectionTabChange}
        aria-label="Fiscal Device Connection Tabs"
        variant="fullWidth"
      >
        <Tab
          label={`${isMobileScreen ? SERIAL_PORT_OR_USB_CONNECTION_MOBILE_TAB_LABEL : SERIAL_PORT_OR_USB_CONNECTION_TAB_LABEL}`}
          icon={<UsbIcon />}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          label={`${isMobileScreen ? LAN_OR_WIFI_CONNECTION_MOBILE_TAB_LABEL : LAN_OR_WIFI_CONNECTION_TAB_LABEL}`}
          icon={<LanIcon />}
          iconPosition="start"
          {...a11yProps(1)}
        />
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
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: { xs: 'center', md: 'space-between' },
                      gap: 2
                    }}>
                      <Box textAlign="left" sx={{ width: '100%' }}>
                        <FormControl fullWidth size="small">
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
                      </Box>
                      <Box textAlign="left" sx={{ width: '100%' }}>
                        <FormControl fullWidth size="small">
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
                      </Box>
                    </Box>
                    {serialPortOrUSBConnectionState &&
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', ml: { xs: '0px', sm: '36px' }, mt: 2 }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<SearchIcon />}
                          onClick={() => handleFindDeviceClick(setFieldValue, setTouched, setErrors)}
                        >
                          Find
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<CableIcon />}>
                          Connect
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
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
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: { xs: 'center', md: 'space-between' },
                      gap: 2
                    }}>
                      <Box textAlign="left" sx={{ width: '100%' }}>
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
                      </Box>
                      <Box textAlign="left" sx={{ width: '100%' }}>
                        <Paragraph fontSize={14}>Network Password</Paragraph>
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
                      </Box>
                    </Box>
                    {lanOrWifiConnectionState &&
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button type="submit" variant="contained" startIcon={<NetworkPingIcon />}>
                        Connect
                      </Button>
                    </Box>
                  </Box>
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
  fiscalDeviceConnectionHandler: PropTypes.func
}

export default FiscalDeviceConnection;