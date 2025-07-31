import axiosInstance from "../../axios";
import { RegisterPayload, AuthResponse } from "../../../types";

/**
 * Register a new user.
 * @param payload - The registration payload.
 * @returns The authentication response.
 */
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};
