import { AuthResponse, ExtendedAxiosError, RegisterPayload } from "../../../types";
import { register } from "../../services/auth/register";

/**
 * Register a new user.
 * @param newUser - The registration payload.
 * @returns The authentication response.
 */
export const createUser = async ({
  newUser,
  onSuccess,
  onError,
  onLoading,
}: {
  newUser: RegisterPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: ExtendedAxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await register(newUser);
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as ExtendedAxiosError);
  } finally {
    onLoading?.(false);
  }
};
