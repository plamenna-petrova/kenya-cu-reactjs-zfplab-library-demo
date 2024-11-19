import { createSlice } from "@reduxjs/toolkit";
import {
  ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE,
  FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE
} from '../../utils/constants';

interface ZFPLabServerConnectionState {
  isConnecting: boolean;
  isConnected: boolean;
  connectionStateMessage: string;
}

interface FiscalDeviceConnectionState {
  isSearching: boolean;
  isConnected: boolean;
  connectionStateMessage: string;
}

interface ZFPConnectionState {
  zfpLabServerConnectionState: ZFPLabServerConnectionState;
  fiscalDeviceConnectionState: FiscalDeviceConnectionState
}

const zfpConnectionInitialState: ZFPConnectionState = {
  zfpLabServerConnectionState: {
    isConnecting: false,
    isConnected: false,
    connectionStateMessage: ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE
  },
  fiscalDeviceConnectionState: {
    isSearching: false,
    isConnected: false,
    connectionStateMessage: FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE
  }
}

export const zfpConnectionSlice = createSlice({
  name: 'zfp-connection',
  initialState: zfpConnectionInitialState,
  reducers: {
    setIsConnectingToZFPLabServer: (state, action) => {
      state.zfpLabServerConnectionState.isConnecting = action.payload as boolean;
    },
    setZFPLabServerConnectionState: (state, action) => {
      const { isConnected, connectionStateMessage } =
        action.payload as Pick<ZFPLabServerConnectionState, "isConnected" | "connectionStateMessage">;
      state.zfpLabServerConnectionState.isConnected = isConnected;
      state.zfpLabServerConnectionState.connectionStateMessage = connectionStateMessage;
    },
    setIsSearchingForFiscalDevice: (state, action) => {
      state.fiscalDeviceConnectionState.isSearching = action.payload as boolean;
    },
    setFiscalDeviceConnectionState: (state, action) => {
      const { isConnected, connectionStateMessage } =
        action.payload as Pick<FiscalDeviceConnectionState, "isConnected" | "connectionStateMessage">;
      state.fiscalDeviceConnectionState.isConnected = isConnected;
      state.fiscalDeviceConnectionState.connectionStateMessage = connectionStateMessage;
    }
  }
})

export const {
  setIsConnectingToZFPLabServer,
  setZFPLabServerConnectionState,
  setIsSearchingForFiscalDevice,
  setFiscalDeviceConnectionState
} = zfpConnectionSlice.actions;

export default zfpConnectionSlice.reducer