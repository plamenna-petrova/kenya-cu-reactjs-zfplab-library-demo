import { 
  SERIAL_PORT_CONNECTION, 
  DEFAULT_SERIAL_PORT, 
  BAUD_RATES, 
  FISCAL_DEVICE_CONNECTION_SETTINGS_KEY, 
  TCP_CONNECTION 
} from "./constants";

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
    return null;
  }

  return JSON.parse(savedFiscalDeviceConnectionSettingsJSON);
}

export const updateSerialPorts = (originalSerialPorts, serialPortToAdd) => {
  const serialPortsToFilter = [...originalSerialPorts, serialPortToAdd];

  const comPorts = serialPortsToFilter.filter(serialPort => serialPort.startsWith("COM"));
  const otherPorts = serialPortsToFilter.filter(serialPort => !serialPort.startsWith("COM"));

  const sortedCOMPorts = comPorts.sort((a, b) => {
    const firstCOMPortNumberToCompare = parseInt(a.replace(/\D/g, ""), 10);
    const secondCOMPortNumberToCompare = parseInt(b.replace(/\D/g, ""), 10);
    return firstCOMPortNumberToCompare - secondCOMPortNumberToCompare;
  });

  return [...sortedCOMPorts, ...otherPorts];
}