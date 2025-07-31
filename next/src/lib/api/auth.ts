import { AuthLoginResponse, AuthResponse, User } from "@/lib/definitions";
import axiosInstance from "./axiosConfig";

/**
 * Create a new user.
 * @param newUser - The data for the new user.
 * @returns The created user.
 */
export const createUser = async (newUser: User): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    `/auth/register`,
    newUser
  );
  return data;
};

/**
 * Log in a user.
 * @param user - The user credentials.
 * @returns The login response.
 */
export const signInUser = async (user: User): Promise<AuthLoginResponse> => {
  const { data } = await axiosInstance.post<AuthLoginResponse>(
    `/auth/login`,
    user
  );
  return data;
};

/**
 * Log out the current user.
 * @returns The logout response.
 */
export const logout = async (): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(`/auth/logout`, {});
  return data;
};
