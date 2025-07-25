import { setBackdropLoading } from "../store/slices/loadingSlice";
import { DEFAULT_LOADING_MESSAGE } from "./constants";

export const executeFPOperationWithLoading = async (dispatch, asyncFPOperationCallback, loadingMessage = DEFAULT_LOADING_MESSAGE) => {
  try {
    await showBackdropLoading(dispatch, loadingMessage);
    await asyncFPOperationCallback();
  } finally {
    dispatch(setBackdropLoading({ isLoading: false }));
  }
};

const showBackdropLoading = (dispatch, loadingMessage) => {
  return new Promise((resolve) => {
    dispatch(setBackdropLoading({ isLoading: true, message: loadingMessage }));
    setTimeout(() => {
      resolve();
    }, 500);
  });
};