import { SerialPortOrUSBConnectionSettings } from './../../interfaces/fiscal-device-connection-settings/SerialPortOrUSBConnectionSettings';
import { APPLICATION_XML } from './../../utils/constants';
import axiosInstance from "../axiosInstance";

export const findFiscalDevice = async (): Promise<SerialPortOrUSBConnectionSettings | null> => {
  const response = await axiosInstance.get("/FindDevice");

  const foundFiscalDeviceSettingsXMLDocument: Document = new DOMParser().parseFromString(
    response.data,
    APPLICATION_XML
  );

  const comNode: Element = foundFiscalDeviceSettingsXMLDocument.getElementsByTagName("com")[0];
  const baudNode: Element = foundFiscalDeviceSettingsXMLDocument.getElementsByTagName("baud")[0];

  if (!comNode?.firstChild || !baudNode?.firstChild) {
    return null;
  }

  const serialPort: string | null = comNode.firstChild.nodeValue!;
  const baudRate: number = Number(baudNode.firstChild.nodeValue);

  return { serialPort, baudRate };
}

export const setFiscalDeviceSerialPortOrUSBConnectionSettings = async (
  serialPort: string, 
  baudRate: number, 
  keepPortOpen: boolean
): Promise<void> => {
  await axiosInstance.get(`/Settings(com=${serialPort},baud=${baudRate},keepPortOpen=${keepPortOpen ? '1' : '0'},tcp=0)`);
}

export const setFiscalDeviceLANOrWiFiConnectionSettings = async (
  fiscalDeviceIPAdress: string, 
  tcpPort: number, 
  lanOrWifiPassword?: string | undefined
): Promise<void> => {
  await axiosInstance.get(`/Settings(ip=${fiscalDeviceIPAdress},port=${tcpPort}${lanOrWifiPassword ? `,password=${lanOrWifiPassword}` : ''},tcp=1)`);
}

export const getSettingsForConnectionTest = async (): Promise<Element> => {
  const response = await axiosInstance.get('/Settings');

  const settingsForConnectionTestXMLDocument: Document = new DOMParser().parseFromString(
    response.data,
    APPLICATION_XML
  );

  const settingsNode: Element = settingsForConnectionTestXMLDocument.getElementsByTagName("settings")[0];

  return settingsNode;
}