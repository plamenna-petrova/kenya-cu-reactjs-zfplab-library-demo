import { createSlice } from "@reduxjs/toolkit";

interface FullscreenModeState {
  isFullscreenModeActive: boolean;
}

const fullscreenModeInitialState: FullscreenModeState = {
  isFullscreenModeActive: false
}

const fullscreenSlice = createSlice({
  name: 'fullscreen',
  initialState: fullscreenModeInitialState,
  reducers: {
    enterFullscreenMode: (state) => {
      state.isFullscreenModeActive = true;
    },
    exitFullscreenMode: (state) => {
      state.isFullscreenModeActive = false;
    }
  }
});

export const { enterFullscreenMode, exitFullscreenMode } = fullscreenSlice.actions;

export default fullscreenSlice.reducer;