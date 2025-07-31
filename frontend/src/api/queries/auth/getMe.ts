import { AxiosError } from "axios";
import { MeResponse } from "../../../types";
import { getMe } from "../../services/auth/getMe";

/**
 * Get the authenticated user's profile.
 * @returns The authenticated user's information.
 */
export const fetchMe = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: MeResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await getMe();
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
