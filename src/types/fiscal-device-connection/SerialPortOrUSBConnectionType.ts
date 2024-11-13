import { fiscalDeviceConnectionTypes } from "./FiscalDeviceConnectionType";

export type SerialPortOrUSBConnectionType = {
  serialPort: string;
  baudRate: number;
  connectionType: typeof fiscalDeviceConnectionTypes["Serial"];
}
