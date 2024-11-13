export interface FiscalDeviceAlertConnectionState {
  severity: "success" | "warning" | "error" | "info" | undefined;
  message: string;
}