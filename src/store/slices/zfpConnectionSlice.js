import { createSlice } from "@reduxjs/toolkit";
import { ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE, FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE } from '../../utils/constants';

const zfpConnectionInitialState = {
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
            state.zfpLabServerConnectionState.isConnecting = action.payload;
        },
        setZFPLabServerConnectionState: (state, action) => {
            const { isConnected, connectionStateMessage } = action.payload;
            state.zfpLabServerConnectionState.isConnected = isConnected;
            state.zfpLabServerConnectionState.connectionStateMessage = connectionStateMessage;
        },
        setIsSearchingForFiscalDevice: (state, action) => {
            state.fiscalDeviceConnectionState.isSearching = action.payload;
        },
        setFiscalDeviceConnectionState: (state, action) => {
            const { isConnected, connectionStateMessage } = action.payload;
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