import { fiscalDeviceConnectionTypes, FiscalDeviceConnectionType } from '../types/fiscal-device-connection/FiscalDeviceConnectionType';
import { SerialPortOrUSBConnectionSettings } from '../interfaces/fiscal-device-connection-settings/SerialPortOrUSBConnectionSettings';
import { LANOrWiFiConnectionSettings } from '../interfaces/fiscal-device-connection-settings/LANOrWiFiConnectionSettings';
import { DEFAULT_SERIAL_PORT, BAUD_RATES, FISCAL_DEVICE_CONNECTION_SETTINGS_KEY } from "./constants";
import { SerialPortOrUSBConnectionType } from '../types/fiscal-device-connection/SerialPortOrUSBConnectionType';
import { LANOrWiFiConnectionType } from '../types/fiscal-device-connection/LANOrWiFiConnectionType';

export const getInitialFiscalDeviceConnectionFormValues = (
  requestedConnectionType: FiscalDeviceConnectionType
): SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings => {
  const configuredFiscalDeviceConnectionSettings = getConfiguredFiscalDeviceConnectionSettings();

  let initialFiscalDeviceConnectionFormValuesToSet: SerialPortOrUSBConnectionSettings | LANOrWiFiConnectionSettings =
    requestedConnectionType === fiscalDeviceConnectionTypes.Serial
      ? configuredFiscalDeviceConnectionSettings &&
        configuredFiscalDeviceConnectionSettings.connectionType === fiscalDeviceConnectionTypes.Serial
        ? {
          serialPort: (configuredFiscalDeviceConnectionSettings as SerialPortOrUSBConnectionType).serialPort,
          baudRate: (configuredFiscalDeviceConnectionSettings as SerialPortOrUSBConnectionType).baudRate
        }
        : {
          serialPort: DEFAULT_SERIAL_PORT,
          baudRate: BAUD_RATES[BAUD_RATES.length - 1]
        }
      : configuredFiscalDeviceConnectionSettings &&
        configuredFiscalDeviceConnectionSettings.connectionType === fiscalDeviceConnectionTypes.TCP
        ? {
          fiscalDeviceIPAddress: (configuredFiscalDeviceConnectionSettings as LANOrWiFiConnectionType).fiscalDeviceIPAddress,
          lanOrWifiPassword: (configuredFiscalDeviceConnectionSettings as LANOrWiFiConnectionType).lanOrWifiPassword
        }
        : {
          fiscalDeviceIPAddress: "",
          lanOrWifiPassword: ""
        };

  return initialFiscalDeviceConnectionFormValuesToSet;
}

export const getConfiguredFiscalDeviceConnectionSettings = (): SerialPortOrUSBConnectionType | LANOrWiFiConnectionType | null => {
  const savedFiscalDeviceConnectionSettingsJSON: string | null = localStorage.getItem(FISCAL_DEVICE_CONNECTION_SETTINGS_KEY);

  if (!savedFiscalDeviceConnectionSettingsJSON) {
    return null;
  }

  return JSON.parse(savedFiscalDeviceConnectionSettingsJSON);
}

export const updateSerialPorts = (originalSerialPorts: string[], serialPortToAdd: string): string[] => {
  const serialPortsToFilter: string[] = [...originalSerialPorts, serialPortToAdd];

  const comPorts: string[] = serialPortsToFilter.filter(serialPort => serialPort.startsWith("COM"));
  const otherPorts: string[] = serialPortsToFilter.filter(serialPort => !serialPort.startsWith("COM"));

  const sortedCOMPorts: string[] = comPorts.sort((a, b) => {
    const firstCOMPortNumberToCompare: number = parseInt(a.replace(/\D/g, ""), 10);
    const secondCOMPortNumberToCompare: number = parseInt(b.replace(/\D/g, ""), 10);
    return firstCOMPortNumberToCompare - secondCOMPortNumberToCompare;
  });

  return [...sortedCOMPorts, ...otherPorts];
}