import axiosInstance from "../../axios";
import { Category } from "../../../types";

/**
 * Retrieve all categories.
 * @returns An array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get("/categories");
  return data;
};
