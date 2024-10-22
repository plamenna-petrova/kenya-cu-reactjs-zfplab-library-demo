import { configureStore } from '@reduxjs/toolkit';

import appNavigationReducer from './slices/appNavigationSlice';
import loadingReducer from './slices/loadingSlice';
import zfpConnectionReducer from './slices/zfpConnectionSlice';

export const store = configureStore({
    reducer: {
        appNavigation: appNavigationReducer,
        loading: loadingReducer,
        zfpConnection: zfpConnectionReducer
    }
})
