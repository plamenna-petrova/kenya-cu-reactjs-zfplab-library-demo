import { createSlice } from "@reduxjs/toolkit";

const loadingInitialState = {
    isLoading: false,
    message: null
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: loadingInitialState,
    reducers: {
        setBackdropLoading: (state, action) => {
            const { isLoading, message } = action.payload; 
            state.isLoading = isLoading;
            state.message = message || null;
        }
    }
})

export const { setBackdropLoading } = loadingSlice.actions;

export default loadingSlice.reducer