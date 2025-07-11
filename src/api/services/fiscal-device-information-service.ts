import { ModelAndVersionRes } from './../../interfaces/fiscal-device-information/ModelAndVersionRes';
import { analyzeZFPLabServerResponseData } from '../../utils/helperFunctions';
import axiosInstance from "../axiosInstance"

export const readModelAndVersion = async (): Promise<ModelAndVersionRes> => {
  const response = await axiosInstance.get('/ReadVersion');
  const modelAndVersionRes = analyzeZFPLabServerResponseData(response.data) as ModelAndVersionRes;
  return modelAndVersionRes;
}