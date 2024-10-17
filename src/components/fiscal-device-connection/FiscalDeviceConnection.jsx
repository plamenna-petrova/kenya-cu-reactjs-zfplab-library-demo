import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Formik } from "formik";
import { Paragraph } from '../typography-elements/TypographyElements';
import {
  BAUD_RATES,
  FISCAL_DEVICE_CONNECTION_SETTINGS_KEY,
  SELECT_MENU_ITEM_HEIGHT,
  SELECT_MENU_ITEM_PADDING_TOP,
  SERIAL_PORT_CONNECTION,
  TCP_CONNECTION
} from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useFP } from '../../hooks/useFP';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
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
import CloseIcon from '@mui/icons-material/Close';
// import Tremol from '../../assets/js/fp.js';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';

const FiscalDeviceConnectionStyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: '100%',
  maxWidth: 800,
  minWidth: 0,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '300px',
    margin: theme.spacing(1),
  },
}));

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

const FiscalDeviceConnection = () => {
  const [fiscalDeviceConnectionTabValue, setFiscalDeviceConnectionTabValue] = useState(0);
  const [serialPorts, setSerialPorts] = useState([]);
  const [serialPortOrUSBConnectionStatus, setSerialPortOrUSBConnectionStatus] = useState(null);
  const isMobileScreen = useMediaQuery('(max-width:480px)');
  const fp = useFP();
  const dispatch = useDispatch();

  const handleFiscalDeviceConnectionTabChange = (_, newValue) => {
    setFiscalDeviceConnectionTabValue(newValue);
  };

  const serialPortOrUSBConnectionInitialFormValues = {
    serialPort: "COM1",
    baudRate: BAUD_RATES[BAUD_RATES.length - 1]
  }

  const serialPortOrUSBConnectionValidationSchema = Yup.object().shape({
    serialPort: Yup.string().required(),
    baudRate: Yup.number().required()
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
  
          setSerialPortOrUSBConnectionStatus({
            severity: 'success',
            message: `A fiscal device has been found on ${serialPort} and baud rate: ${baudRate}`
          });
        } else {
          setSerialPortOrUSBConnectionStatus({
            severity: 'warning',
            message: `A fiscal device couldn't be found`
          });
        }
      } catch (error) {
        console.error(error);
  
        setSerialPortOrUSBConnectionStatus({
          severity: 'error',
          message: 'An error occurred while trying to find a fiscal device'
        });
      }
    }, 'Searching for a fiscal device...');
  }

  const handleSerialPortOrUSBConnectionStatusAlertClose = () => {
    setSerialPortOrUSBConnectionStatus(null);
  }

  const handleFiscalDeviceConnectionFormSubmit = async (fiscalDeviceConnectionSettingsFormData, setSubmitting, connectionType) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        let connectedFiscalDeviceSettings = {};

        switch (connectionType) {
          case SERIAL_PORT_CONNECTION: {
            const { serialPort, baudRate } = fiscalDeviceConnectionSettingsFormData;

            await fp.ServerSetDeviceSerialSettings(serialPort, baudRate, true);

            await fp.ApplyClientLibraryDefinitions();

            const statusEntries = await fp.ReadStatus();

            console.log(statusEntries);

            connectedFiscalDeviceSettings = {
              connectionType,
              serialPort,
              baudRate,
            };
            
            localStorage.setItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY, JSON.stringify(connectedFiscalDeviceSettings));

            toast.success("Successfully connected to the fiscal device");

            setSerialPortOrUSBConnectionStatus({
              severity: 'success',
              message: `The fiscal device is connected on ${serialPort} and baud rate: ${baudRate}`,
            });
            break;
          }
          case TCP_CONNECTION: {
            break;
          }
        }
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
        
        setSerialPortOrUSBConnectionStatus({
          severity: 'error',
          message: `Couldn't connect to a fiscal device`,
        });

        localStorage.removeItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY);
      } finally {
        setSubmitting(false);
      }
    }, 'Connecting to a fiscal device...');
  };

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
    <FiscalDeviceConnectionStyledCard>
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
            initialValues={serialPortOrUSBConnectionInitialFormValues}
            validationSchema={serialPortOrUSBConnectionValidationSchema}
            onSubmit={(values, { setSubmitting }) => handleFiscalDeviceConnectionFormSubmit(values, setSubmitting, SERIAL_PORT_CONNECTION)}
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
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>
                          Serial Port
                        </Paragraph>
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
                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>
                          Baud Rate
                        </Paragraph>
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
                    {serialPortOrUSBConnectionStatus &&
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 0 }}>
                        <Collapse in={!!serialPortOrUSBConnectionStatus} sx={{ width: '100%' }}>
                          <Alert
                            variant="outlined"
                            severity={serialPortOrUSBConnectionStatus.severity}
                            action={
                              <IconButton
                                aria-label="Close Serial Port Or USB Connection Status Alert"
                                color="inherit"
                                size="small"
                                onClick={handleSerialPortOrUSBConnectionStatusAlertClose}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                          >
                            {serialPortOrUSBConnectionStatus.message}
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
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 2 6</Typography>
            </Grid>
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 2 6</Typography>
            </Grid>
          </Grid>
        </FiscalDeviceConnectionTabPanel>
      </CardContent>
    </FiscalDeviceConnectionStyledCard>
  )
}

export default FiscalDeviceConnection;