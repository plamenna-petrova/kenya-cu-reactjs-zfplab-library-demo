import { createSlice } from "@reduxjs/toolkit";

const fullscreenSlice = createSlice({
  name: 'fullscreen',
  initialState: {
    isFullscreen: false
  },
  reducers: {
    enterFullscreen: (state) => {
      state.isFullscreen = true;
    },
    exitFullscreen: (state) => {
      state.isFullscreen = false;
    }
  }
});

export const { enterFullscreen, exitFullscreen } = fullscreenSlice.actions;

export default fullscreenSlice.reducer;