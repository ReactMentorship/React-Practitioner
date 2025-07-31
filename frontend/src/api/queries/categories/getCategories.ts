import { AxiosError } from "axios";
import { Category } from "../../../types";
import { getCategories } from "../../services/categories/getCategories";

/**
 * Retrieve all categories.
 * @returns An array of Category objects.
 */
export const fetchCategories = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: Category[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await getCategories();
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
