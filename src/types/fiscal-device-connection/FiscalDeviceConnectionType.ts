import { SERIAL_PORT_CONNECTION, TCP_CONNECTION } from "../../utils/constants";

export const fiscalDeviceConnectionTypes = {
  Serial: SERIAL_PORT_CONNECTION,
  TCP: TCP_CONNECTION
} as const;

export type FiscalDeviceConnectionType = (typeof fiscalDeviceConnectionTypes)[keyof typeof fiscalDeviceConnectionTypes];