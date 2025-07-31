import axiosInstance from "../../axios";
import { MeResponse } from "../../../types";

/**
 * Get the authenticated user's profile.
 * @returns The authenticated user's information.
 */
export const getMe = async (): Promise<MeResponse> => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
