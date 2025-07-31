import { AxiosError } from "axios";
import { Category } from "../../../types";
import { deleteCategory } from "../../services/categories/deleteCategory";

/**
 * Delete a category by ID.
 * @param categoryID - The ID of the category to delete.
 * @returns The deleted Category object.
 */
export const deleteCategoryQuery = async ({
  categoryID,
  onSuccess,
  onError,
  onLoading,
}: {
  categoryID: string;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  if (onLoading) onLoading(true);
  try {
    const data = await deleteCategory(categoryID);
    onSuccess?.(data);
  } catch (error) {
    console.error(error);
    onError?.(error as AxiosError);
  } finally {
    onLoading?.(false);
  }
};
