import axiosInstance from "../../axios";
import { AuthResponse } from "../../../types";

/**
 * Log out the current user.
 * @returns The authentication response.
 */
export const logout = async (): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
