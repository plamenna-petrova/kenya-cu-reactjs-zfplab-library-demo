import { createSlice } from "@reduxjs/toolkit";

const fullscreenModeSlice = createSlice({
  name: 'fullscreen-mode',
  initialState: {
    isFullscreenModeActive: false
  },
  reducers: {
    enterFullscreenMode: (state) => {
      state.isFullscreenModeActive = true;
    },
    exitFullscreenMode: (state) => {
      state.isFullscreenModeActive = false;
    }
  }
});

export const { enterFullscreenMode, exitFullscreenMode } = fullscreenModeSlice.actions;

export default fullscreenModeSlice.reducer;