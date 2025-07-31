import axios from "axios";

import { fetchUser } from "../auth/authSlice";
import { store } from "../stores/authStore";

export const BASE_URL = "http://localhost:3001/api";

// Create axios instance with base config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // allow cookies for auth endpoints
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthError = error.status === 401;
    const isAlreadyOnLoginPage = window.location.pathname === "/login";

    if (isAuthError && !isAlreadyOnLoginPage) {
      // Clear user data
      store.dispatch(fetchUser());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
