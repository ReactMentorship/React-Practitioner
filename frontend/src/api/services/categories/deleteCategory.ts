import axiosInstance from "../../axios";
import { Category } from "../../../types";

/**
 * Delete a category by ID.
 * @param id - The ID of the category to delete.
 * @returns The deleted Category object.
 */
export const deleteCategory = async (id: string): Promise<Category> => {
  const { data } = await axiosInstance.delete(`/categories/${id}`);
  return data;
};
