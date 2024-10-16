import { configureStore } from '@reduxjs/toolkit';

import appNavigationReducer from './slices/appNavigationSlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
    reducer: {
        appNavigation: appNavigationReducer,
        loading: loadingReducer
    }
})
