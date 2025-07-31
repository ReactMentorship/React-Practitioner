import axios from "axios";

export const BASE_URL = "http://localhost:3001/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default axiosInstance;
