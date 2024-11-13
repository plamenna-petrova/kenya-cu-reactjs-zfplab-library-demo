import { fiscalDeviceConnectionTypes } from "./FiscalDeviceConnectionType";

export type LANOrWiFiConnectionType = {
  fiscalDeviceIPAddress: string;
  lanOrWifiPassword: string;
  connectionType: typeof fiscalDeviceConnectionTypes["TCP"]
}
