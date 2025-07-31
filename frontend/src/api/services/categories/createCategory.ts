import axiosInstance from "../../axios";
import { Category } from "../../../types";

/**
 * Create a new category.
 * @param name - The name of the category.
 * @returns The created Category object.
 */
export const createCategory = async (name: string): Promise<Category> => {
  const { data } = await axiosInstance.post("/categories", { name });
  return data;
};
