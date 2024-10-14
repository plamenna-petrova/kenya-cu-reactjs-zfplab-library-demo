import { configureStore } from '@reduxjs/toolkit';

import appNavigationReducer from './slices/appNavigationSlice';

export const store = configureStore({
    reducer: {
        appNavigation: appNavigationReducer
    }
})
