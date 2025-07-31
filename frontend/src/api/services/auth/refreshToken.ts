import axiosInstance from "../../axios";
import { AuthResponse } from "../../../types";

/**
 * Refresh the authentication token.
 * @returns The refreshed authentication response.
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/refresh");
  return data;
};
