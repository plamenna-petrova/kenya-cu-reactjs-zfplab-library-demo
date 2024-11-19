import { AppDispatch } from "../store";
import { setBackdropLoading } from "../store/slices/loadingSlice";
import { DEFAULT_LOADING_MESSAGE } from "./constants";

type AsyncFPOperationCallback = () => Promise<void>;

export const executeFPOperationWithLoading = async (
  dispatch: AppDispatch, 
  asyncFPOperationCallback: AsyncFPOperationCallback, 
  loadingMessage: string = DEFAULT_LOADING_MESSAGE
): Promise<void> => {
  try {
    await showBackdropLoading(dispatch, loadingMessage);
    await asyncFPOperationCallback();
  } finally {
    dispatch(setBackdropLoading({ isLoading: false }));
  }
};

const showBackdropLoading = (dispatch: AppDispatch, loadingMessage: string): Promise<void> => {
  return new Promise((resolve) => {
    dispatch(setBackdropLoading({ isLoading: true, message: loadingMessage }));
    setTimeout(() => {
      resolve();
    }, 500);
  });
};