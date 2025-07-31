import { AxiosError } from "axios";
import { AuthResponse } from "../../../types";
import { logout } from "../../services/auth/logout";

/**
 * Log out the current user.
 * @returns The authentication response.
 */
export const logoutUser = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await logout();
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
