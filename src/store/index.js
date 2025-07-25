import { configureStore } from '@reduxjs/toolkit';

import appNavigationReducer from './slices/appNavigationSlice';
import loadingReducer from './slices/loadingSlice';
import zfpConnectionReducer from './slices/zfpConnectionSlice';
import operatorDataReducer from './slices/operatorDataSlice';
import fullscreenModeReducer from './slices/fullScreenModeSlice';

export const store = configureStore({
  reducer: {
    appNavigation: appNavigationReducer,
    loading: loadingReducer,
    zfpConnection: zfpConnectionReducer,
    operatorData: operatorDataReducer,
    fullscreenMode: fullscreenModeReducer
  }
});
