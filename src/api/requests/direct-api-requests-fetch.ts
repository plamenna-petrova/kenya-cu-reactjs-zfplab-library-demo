import { SerialPortOrUSBConnectionSettings } from '../../interfaces/fiscal-device-connection-settings/SerialPortOrUSBConnectionSettings';
import { APPLICATION_XML } from '../../utils/constants';

const DEFAULT_ZFP_LAB_SERVER_ADDRESS: string = "http://localhost:4444";

const DIRECT_API_PROXY_PREFIX: string = '/direct-api';

const fetchWithErrorHandling = async (requestInfo: RequestInfo, requestInit?: RequestInit) => {
  const response = await fetch(`${DEFAULT_ZFP_LAB_SERVER_ADDRESS}${requestInfo}`, requestInit);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
  }

  return response;
};

export const findFiscalDevice = async (): Promise<SerialPortOrUSBConnectionSettings | null> => {
  const response = await fetchWithErrorHandling('/FindDevice');
  const responseText = await response.text();

  const xmlDoc: Document = new DOMParser().parseFromString(responseText, APPLICATION_XML);

  const comNode: Element = xmlDoc.getElementsByTagName('com')[0];
  const baudNode: Element = xmlDoc.getElementsByTagName('baud')[0];

  if (!comNode?.firstChild || !baudNode?.firstChild) {
    return null;
  }

  const serialPort: string = comNode.firstChild.nodeValue!;
  const baudRate: number = Number(baudNode.firstChild.nodeValue);

  return { serialPort, baudRate };
};

export const setFiscalDeviceSerialPortOrUSBConnectionSettings = async (
  serialPort: string,
  baudRate: number,
  keepPortOpen: boolean
): Promise<void> => {
  const setSerialPortConnectionSettingsQuery: string = `/settings?com=${serialPort}&baud=${baudRate}&keepPortOpen=${keepPortOpen ? '1' : '0'}&tcp=0`;

  try {
    console.log(`Setting fiscal device connection settings: serialPort=${serialPort}, baudRate=${baudRate}, keepPortOpen=${keepPortOpen}`);
    await fetchWithErrorHandling(setSerialPortConnectionSettingsQuery);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setFiscalDeviceLANOrWiFiConnectionSettings = async (
  fiscalDeviceIPAdress: string,
  tcpPort: number,
  lanOrWiFiPassword?: string
): Promise<void> => {
  const lanOrWifiPasswordParam: string = lanOrWiFiPassword ? `&password=${lanOrWiFiPassword}` : '';
  const setLANOrWiFiConnectionSettingsQuery: string = `/settings?ip=${fiscalDeviceIPAdress}&port=${tcpPort}${lanOrWifiPasswordParam}&tcp=1`;

  await fetchWithErrorHandling(setLANOrWiFiConnectionSettingsQuery);
};

export const getSettingsForConnectionTest = async (): Promise<Element> => {
  const response: Response = await fetchWithErrorHandling('/settings');
  const responseText: string = await response.text();

  const xmlDoc: Document = new DOMParser().parseFromString(responseText, APPLICATION_XML);
  const settingsNode: Element = xmlDoc.getElementsByTagName('settings')[0];

  return settingsNode;
};

export const readStatusPOST = async (): Promise<any> => {
  const readStatusXMLCommand = `<Command Name="ReadStatus"></Command>`;

  try {
    const readStatusResponse: Response = await fetchWithErrorHandling('/ReadStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: readStatusXMLCommand,
    });

    return readStatusResponse.text();
  } catch (error) {
    console.error('Error reading fiscal device status', error);
    throw error;
  }
};

export const readStatusGET = async (): Promise<any> => {
  try {
    const response = await fetchWithErrorHandling('/ReadStatus');
    return response.text();
  } catch (error) {
    console.error('Error reading fiscal device status', error);
    throw error;
  }
};

export default {
  findFiscalDevice,
  setFiscalDeviceSerialPortOrUSBConnectionSettings,
  setFiscalDeviceLANOrWiFiConnectionSettings,
  getSettingsForConnectionTest,
  readStatusPOST,
  readStatusGET
}