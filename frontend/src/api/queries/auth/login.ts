import { AuthResponse, ExtendedAxiosError, LoginPayload } from "../../../types";
import { login } from "../../services/auth/login";

/**
 * Log in a user.
 * @param user - The login payload.
 * @returns The authentication response.
 */
export const loginUser = async ({
  user,
  onSuccess,
  onError,
  onLoading,
}: {
  user: LoginPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: ExtendedAxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await login(user);
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as ExtendedAxiosError);
  } finally {
    onLoading?.(false);
  }
};
