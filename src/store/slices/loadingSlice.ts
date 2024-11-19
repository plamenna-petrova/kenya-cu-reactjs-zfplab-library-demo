import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
  message: string | null;
}

const loadingInitialState: LoadingState = {
  isLoading: false,
  message: null
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingInitialState,
  reducers: {
    setBackdropLoading: (state, action) => {
      const { isLoading, message } = action.payload as LoadingState;
      state.isLoading = isLoading;
      state.message = message || null;
    }
  }
})

export const { setBackdropLoading } = loadingSlice.actions;

export default loadingSlice.reducer