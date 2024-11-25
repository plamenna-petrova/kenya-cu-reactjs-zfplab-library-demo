import { DEFAULT_ZFP_LAB_SERVER_ADDRESS, ZFP_LAB_SERVER_ADDRESS_KEY } from "../utils/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: localStorage.getItem(ZFP_LAB_SERVER_ADDRESS_KEY) || DEFAULT_ZFP_LAB_SERVER_ADDRESS,
  headers: {
    'Content-Type': 'text/xml'
  }
});

export default axiosInstance;