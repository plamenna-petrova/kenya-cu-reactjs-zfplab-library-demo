import { ModelAndVersionRes } from './../../interfaces/fiscal-device-information/ModelAndVersionRes';
import { SerialAndFiscalNumbersRes } from '../../interfaces/fiscal-device-information/SerialAndFiscalNumbersRes';
import { analyzeZFPLabServerResponseData } from '../../utils/helperFunctions';
import axiosInstance from "../axiosInstance"

export const readSerialAndFiscalNumbers = async (): Promise<SerialAndFiscalNumbersRes> => {
  const response = await axiosInstance.get('/ReadSerialAndFiscalNums');
  const serialAndFiscalNumbersRes = analyzeZFPLabServerResponseData(response.data) as SerialAndFiscalNumbersRes;
  return serialAndFiscalNumbersRes;
}

export const readModelAndVersion = async (): Promise<ModelAndVersionRes> => {
  const response = await axiosInstance.get('/ReadVersion');
  const modelAndVersionRes = analyzeZFPLabServerResponseData(response.data) as ModelAndVersionRes;
  return modelAndVersionRes;
}