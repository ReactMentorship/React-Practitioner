import { AxiosError } from "axios";
import { Category } from "../../../types";
import { createCategory } from "../../services/categories/createCategory";

/**
 * Create a new category.
 * @param categoryName - The name of the category.
 * @returns The created Category object.
 */
export const createCategoryQuery = async ({
  categoryName,
  onSuccess,
  onError,
  onLoading,
}: {
  categoryName: string;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await createCategory(categoryName);
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
