/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, ReactNode, FC, SyntheticEvent } from 'react';
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
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
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { SerialPortOrUSBConnectionType } from '../../types/fiscal-device-connection/SerialPortOrUSBConnectionType';
import { LANOrWiFiConnectionType } from '../../types/fiscal-device-connection/LANOrWiFiConnectionType';
import { useFP } from '../../hooks/useFP';
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { getInitialFiscalDeviceConnectionFormValues, getConfiguredFiscalDeviceConnectionSettings, updateSerialPorts } from '../../utils/connectionUtils';
import { setFiscalDeviceConnectionState, setIsSearchingForFiscalDevice } from '../../store/slices/zfpConnectionSlice';
import { SerialPortOrUSBConnectionSettings } from '../../interfaces/fiscal-device-connection-settings/SerialPortOrUSBConnectionSettings';
import { LANOrWiFiConnectionSettings } from '../../interfaces/fiscal-device-connection-settings/LANOrWiFiConnectionSettings';
import { FiscalDeviceAlertConnectionState } from '../../interfaces/fiscal-device-connection-state/FiscalDeviceAlertConnectionState';
import { FiscalDeviceConnectionType, fiscalDeviceConnectionTypes } from '../../types/fiscal-device-connection/FiscalDeviceConnectionType';
import { serverFindDevice } from '../../api/services/fiscal-device-connection-service';
import * as Yup from "yup";
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

interface FiscalDeviceConnectionTabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const FiscalDeviceConnectionTabPanel: FC<FiscalDeviceConnectionTabPanelProps> = (props) => {
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

const a11yProps = (index: number) => {
  return {
    id: `fiscal-device-connection-tab-${index}`,
    'aria-controls': `fiscal-device-connection-tabpanel-${index}`,
  };
}

interface FiscalDeviceConnectionProps {
  fiscalDeviceConnectionHandler: (
    connectionSettings: SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings, 
    connectionType: FiscalDeviceConnectionType
  ) => Promise<void>;
}

const FiscalDeviceConnection: FC<FiscalDeviceConnectionProps> = ({ fiscalDeviceConnectionHandler }) => {
  const [fiscalDeviceConnectionTabValue, setFiscalDeviceConnectionTabValue] = useState<number>(0);
  const [serialPorts, setSerialPorts] = useState<string[]>([]);
  const [serialPortOrUSBConnectionFormValues, setSerialPortOrUSBConnectionFormValues] = useState<SerialPortOrUSBConnectionSettings>(
    getInitialFiscalDeviceConnectionFormValues(SERIAL_PORT_CONNECTION) as SerialPortOrUSBConnectionSettings
  );
  const [serialPortOrUSBConnectionFormTouched, setSerialPortOrUSBConnectionFormTouched] = 
    useState<FormikTouched<SerialPortOrUSBConnectionSettings>>({});
  const [serialPortOrUSBConnectionFormErrors, setSerialPortOrUSBConnectionFormErrors] = 
  useState<FormikErrors<SerialPortOrUSBConnectionSettings>>({});
  const [lanOrWifiConnectionFormValues, setLANOrWiFiConnectionFormValues] = useState<LANOrWiFiConnectionSettings>(
    getInitialFiscalDeviceConnectionFormValues(TCP_CONNECTION) as LANOrWiFiConnectionSettings
  );
  const [lanOrWifiConnectionFormTouched, setLANOrWifiConnectionFormTouched] = useState<FormikTouched<LANOrWiFiConnectionSettings>>({});
  const [lanOrWifiConnectionFormErrors, setLANOrWifiConnectionFormErrors] = useState<FormikErrors<LANOrWiFiConnectionSettings>>({});
  const [serialPortOrUSBConnectionState, setSerialPortOrUSBConnectionState] = useState<FiscalDeviceAlertConnectionState | null>(null);
  const [lanOrWifiConnectionState, setLanOrWifiConnectionState] = useState<FiscalDeviceAlertConnectionState | null>(null);
  const isMobileScreen: boolean = useMediaQuery('(max-width:480px)');
  const isFullscreenModeActive = useSelector((state: RootState) => state.fullscreenMode.isFullscreenModeActive);
  const dispatch = useDispatch<AppDispatch>();
  const fp = useFP();

  const FiscalDeviceConnectionMenuProps = {
    PaperProps: {
      style: {
        maxHeight: SELECT_MENU_ITEM_HEIGHT * 4.5 + SELECT_MENU_ITEM_PADDING_TOP,
        width: 250,
      },
    },
    disablePortal: isFullscreenModeActive
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

  const handleFiscalDeviceConnectionTabChange = (_: SyntheticEvent, newFiscalDeviceConnectionTabValue: number): void => {
    setFiscalDeviceConnectionTabValue(newFiscalDeviceConnectionTabValue);
  };

  /**
   * Finds a fiscal device and manages form and UI state based on the search result.
   * - Initiates an asynchronous search operation with a loading indicator.
   * - If a fiscal device is found:
   *    - Displays a success alert.
   *    - Updates form field values to reflect the detected fiscal device settings.
   * - If a fiscal device is not found, displays a warning alert.
   * - Adds the found serial port to the autocomplete options if not already included.
   * - While the search is ongoing, displays a loading indicator in the UI.
   * - If an error occurs during the search, displays an error alert.
   * 
   * @async
   * @function handleFindFiscalDeviceClick
   * @param {FormikHelpers<SerialPortOrUSBConnectionSettings>['setFieldValue']} setFieldValue - Formik function to update specific form field values.
   * @param {FormikHelpers<SerialPortOrUSBConnectionSettings>['setTouched']} setTouched - Formik function to update the touched status of form fields.
   * @param {FormikHelpers<SerialPortOrUSBConnectionSettings>['setErrors']} setErrors - Formik function to set field errors in the form.
   * @returns {Promise<void>} A promise that resolves once the search operation completes.
   */
  const handleFindFiscalDeviceClick = async (
    setFieldValue: FormikHelpers<SerialPortOrUSBConnectionSettings>['setFieldValue'], 
    setTouched: FormikHelpers<SerialPortOrUSBConnectionSettings>['setTouched'], 
    setErrors: FormikHelpers<SerialPortOrUSBConnectionSettings>['setErrors']
  ): Promise<void> => {
    dispatch(setIsSearchingForFiscalDevice(true));

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        const foundDeviceSettings = await serverFindDevice();

        if (foundDeviceSettings !== null) {
          const { serialPort, baudRate } = foundDeviceSettings;

          if (!serialPorts.includes(serialPort)) {
            const updatedSerialPorts: string[] = updateSerialPorts(serialPorts, serialPort);
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
      } catch (error: unknown) {
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

  /**
   * Connects to a fiscal device and manages local storage, Redux, and UI state based on the connection outcome.
   * - Initiates an asynchronous operation with a loading indicator.
   * - On a successful connection, stores the connection type and fiscal device connection settings in the local storage.
   * - On connection failure:
   *   - Displays an error alert and removes any existing connection settings from the local storage.
   *   - Shows an error toast with the error message.
   *   - Updates Redux with a "not connected" status and error message.
   * 
   * @async
   * @function handleFiscalDeviceConnectionFormSubmit
   * @param {SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings} fiscalDeviceConnectionSettingsFormData - 
   * Contains connection settings based on the connection type, 
   * either serial port and baud rate or IP address and LAN/WiFi password.
   * @param {FormikHelpers<SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings>['setSubmitting']} setSubmitting - 
   * Formik helper to control the submitting state of the form.
   * @param {FiscalDeviceConnectionType} connectionType - Specifies the connection type for the fiscal device, either "Serial" or "TCP".
   * @returns {Promise<void>} A promise that resolves once the connection operation completes.
   */
  const handleFiscalDeviceConnectionFormSubmit = async (
    fiscalDeviceConnectionSettingsFormData: SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings,
    setSubmitting: FormikHelpers<SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings>['setSubmitting'],
    connectionType: FiscalDeviceConnectionType
  ): Promise<void> => {
    dispatch(setIsSearchingForFiscalDevice(true));

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fiscalDeviceConnectionHandler(fiscalDeviceConnectionSettingsFormData, connectionType);

        let connectedFiscalDeviceSettings = {} as SerialPortOrUSBConnectionType | LANOrWiFiConnectionType;

        if (connectionType === SERIAL_PORT_CONNECTION) {
          connectedFiscalDeviceSettings = {
            connectionType,
            serialPort: (fiscalDeviceConnectionSettingsFormData as SerialPortOrUSBConnectionSettings).serialPort,
            baudRate: (fiscalDeviceConnectionSettingsFormData as SerialPortOrUSBConnectionSettings).baudRate,
          };
        } else {
          connectedFiscalDeviceSettings = {
            connectionType,
            fiscalDeviceIPAddress: (fiscalDeviceConnectionSettingsFormData as LANOrWiFiConnectionSettings).fiscalDeviceIPAddress,
            lanOrWifiPassword: (fiscalDeviceConnectionSettingsFormData as LANOrWiFiConnectionSettings).lanOrWifiPassword
          };
        }

        localStorage.setItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY, JSON.stringify(connectedFiscalDeviceSettings));
      } catch (error: unknown) {
        const fiscalDeviceFailedConnectionStatus: FiscalDeviceAlertConnectionState = {
          severity: "error",
          message: NOT_CONNECTED_TO_FISCAL_DEVICE_ERROR_MESSAGE,
        }

        if (connectionType == SERIAL_PORT_CONNECTION) {
          setSerialPortOrUSBConnectionState(fiscalDeviceFailedConnectionStatus);
        } else {
          setLanOrWifiConnectionState(fiscalDeviceFailedConnectionStatus);
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

  const clearSerialPortOrUSBConnectionStateAlert = (): void => {
    setSerialPortOrUSBConnectionState(null);
  }

  const clearLANOrWifiConnectionStateAlert = (): void => {
    setLanOrWifiConnectionState(null);
  }

  /*
    Populates the serial ports autocomplete options with a sample array.
    - Generates an array of example serial port identifiers (e.g., "COM1" through "COM15").
    - If saved fiscal device settings with a serial port connection type are found in the local storage:
      - Checks if the saved serial port is included in the serial ports array.
      - Adds the saved serial port to the array if it’s not already present.
    - Updates the serial ports state with the final version of the array.
    This effect runs once when the component mounts.
  */
  useEffect(() => {
    let serialPortsOptions: string[] = [];

    for (let i: number = 0; i < 15; i++) {
      serialPortsOptions.push(`COM${i + 1}`);
    }

    const configuredFiscalDeviceConnectionSettings = getConfiguredFiscalDeviceConnectionSettings();

    if (configuredFiscalDeviceConnectionSettings &&
      configuredFiscalDeviceConnectionSettings.connectionType === fiscalDeviceConnectionTypes.Serial &&
      !serialPortsOptions.includes((configuredFiscalDeviceConnectionSettings as SerialPortOrUSBConnectionType).serialPort)) {
      serialPortsOptions = updateSerialPorts(
        serialPortsOptions, (configuredFiscalDeviceConnectionSettings as SerialPortOrUSBConnectionType).serialPort
      );
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
            onSubmit={(values, { setSubmitting }) =>
              handleFiscalDeviceConnectionFormSubmit(values, setSubmitting, fiscalDeviceConnectionTypes.Serial)
            }
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
                            freeSolo
                            size="small"
                            value={values.serialPort}
                            onChange={(_, newSerialPortValue: string | null) => {
                              setFieldValue("serialPort", newSerialPortValue || "");
                            }}
                            inputValue={values.serialPort}
                            onInputChange={(_, newSerialPortInputValue: string) => {
                              setFieldValue("serialPort", newSerialPortInputValue || "");
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
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.2}>
                        <Button
                          variant="contained"
                          startIcon={<SearchIcon />}
                          onClick={() => handleFindFiscalDeviceClick(setFieldValue, setTouched, setErrors)}
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
            onSubmit={(values, { setSubmitting }) =>
              handleFiscalDeviceConnectionFormSubmit(values, setSubmitting, fiscalDeviceConnectionTypes.TCP)
            }
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

export default FiscalDeviceConnection;