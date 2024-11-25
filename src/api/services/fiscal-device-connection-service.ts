import { SerialPortOrUSBConnectionSettings } from './../../interfaces/fiscal-device-connection-settings/SerialPortOrUSBConnectionSettings';
import axiosInstance from "../axiosInstance";

export const serverFindDevice = async (): Promise<SerialPortOrUSBConnectionSettings | null> => {
  try {
    const serverFindDeviceResponse = await axiosInstance.get("/FindDevice");
    
    const foundDeviceSettingsXMLDocument: Document = new DOMParser().parseFromString(
      serverFindDeviceResponse.data, 
      "application/xml"
    );

    const comNode: Element = foundDeviceSettingsXMLDocument.getElementsByTagName("com")[0];
    const baudNode: Element = foundDeviceSettingsXMLDocument.getElementsByTagName("baud")[0];

    if (!comNode?.firstChild || !baudNode?.firstChild) {
      return null;
    }

    const serialPort: string | null = comNode.firstChild.nodeValue; 
    const baudRate: number = Number(baudNode.firstChild.nodeValue);

    if (!serialPort || isNaN(baudRate)) {
      throw new Error("Invalid data retrieved from XML: SerialPort or BaudRate is missing or invalid.");
    }

    return { serialPort, baudRate };
  } catch(error: unknown) {
    throw error;
  }
}