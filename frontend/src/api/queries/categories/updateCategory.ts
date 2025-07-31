import { AxiosError } from "axios";
import { Category } from "../../../types";
import { updateCategory } from "../../services/categories/updateCategory";

/**
 * Update an existing category.
 * @param updatedCategory - The category object with updated data.
 * @returns The updated Category object.
 */
export const updateCategoryQuery = async ({
  updatedCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  updatedCategory: Category;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await updateCategory(updatedCategory.id, updatedCategory.name);
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
