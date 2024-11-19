import { createSlice } from "@reduxjs/toolkit";
import { ZFP_LAB_SERVER_CONNECTION } from "../../utils/constants";

interface AppNavigationState {
  activeSection: string;
}

const appNavigationInitialState: AppNavigationState = {
  activeSection: ZFP_LAB_SERVER_CONNECTION
}

const appNavigationSlice = createSlice({
  name: 'app-navigation',
  initialState: appNavigationInitialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload as string;
    }
  }
})

export const { setActiveSection } = appNavigationSlice.actions;

export default appNavigationSlice.reducer;