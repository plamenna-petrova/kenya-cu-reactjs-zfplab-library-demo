import { SERIAL_PORT_CONNECTION, DEFAULT_SERIAL_PORT, BAUD_RATES, FISCAL_DEVICE_CONNECTION_SETTINGS_KEY, TCP_CONNECTION } from "./constants";

export const getInitialFiscalDeviceConnectionFormValues = (requestedConnectionType) => {
  const configuredFiscalDeviceConnectionSettings = getConfiguredFiscalDeviceConnectionSettings();

  let initialFiscalDeviceConnectionFormValuesToSet = requestedConnectionType === SERIAL_PORT_CONNECTION
    ? configuredFiscalDeviceConnectionSettings && configuredFiscalDeviceConnectionSettings.connectionType === SERIAL_PORT_CONNECTION
      ? {
        serialPort: configuredFiscalDeviceConnectionSettings.serialPort,
        baudRate: configuredFiscalDeviceConnectionSettings.baudRate
      }
      : {
        serialPort: DEFAULT_SERIAL_PORT,
        baudRate: BAUD_RATES[BAUD_RATES.length - 1]
      }
    : configuredFiscalDeviceConnectionSettings && configuredFiscalDeviceConnectionSettings.connectionType === TCP_CONNECTION
      ? {
        fiscalDeviceIPAddress: configuredFiscalDeviceConnectionSettings.fiscalDeviceIPAddress,
        lanOrWifiPassword: configuredFiscalDeviceConnectionSettings.lanOrWifiPassword
      }
      : {
        fiscalDeviceIPAddress: "",
        lanOrWifiPassword: ""
      };

  return initialFiscalDeviceConnectionFormValuesToSet;
}

export const getConfiguredFiscalDeviceConnectionSettings = () => {
  const savedFiscalDeviceConnectionSettingsJSON = localStorage.getItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY);

  if (!savedFiscalDeviceConnectionSettingsJSON) {
    return undefined;
  }

  return JSON.parse(savedFiscalDeviceConnectionSettingsJSON);
} 