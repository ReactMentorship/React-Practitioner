import axiosInstance from "../../axios";
import { Category } from "../../../types";

/**
 * Update an existing category.
 * @param id - The ID of the category.
 * @param name - The new name of the category.
 * @returns The updated Category object.
 */
export const updateCategory = async (id: string, name: string): Promise<Category> => {
  const { data } = await axiosInstance.patch(`/categories/${id}`, { name });
  return data;
};
