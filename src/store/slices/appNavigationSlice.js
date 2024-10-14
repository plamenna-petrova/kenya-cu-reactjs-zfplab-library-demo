import { createSlice } from "@reduxjs/toolkit";
import { FISCAL_DEVICE_CONNECTION } from "../../utils/constants";

const appNavigationInitialState = {
    activeSection: FISCAL_DEVICE_CONNECTION
}

const appNavigationSlice = createSlice({
    name: 'app-navigation',
    initialState: appNavigationInitialState,
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        }
    }
})

export const { setActiveSection } = appNavigationSlice.actions;

export default appNavigationSlice.reducer;