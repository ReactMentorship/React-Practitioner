import axiosInstance from "../../axios";
import { LoginPayload, AuthResponse } from "../../../types";

/**
 * Log in a user.
 * @param payload - The login payload.
 * @returns The authentication response.
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};
