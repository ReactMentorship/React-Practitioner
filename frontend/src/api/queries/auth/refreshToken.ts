import { AxiosError } from "axios";
import { AuthResponse } from "../../../types";
import { refreshToken } from "../../services/auth/refreshToken";

/**
 * Refresh the authentication token.
 * @returns The refreshed authentication response.
 */
export const refreshAuthToken = async ({
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
    const data = await refreshToken();
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
