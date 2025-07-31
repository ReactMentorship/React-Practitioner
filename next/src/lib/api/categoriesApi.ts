import {
  CategoriesResponse,
  NewCategory,
  UpdateCategoryRequest,
} from "@/lib/definitions";
import { QueryFunctionContext } from "@tanstack/react-query";
import axiosInstance from "./axiosConfig";

/**
 * Fetch all categories.
 * @returns The fetched categories.
 */
export const fetchCategories = async (): Promise<CategoriesResponse[]> => {
  const { data } = await axiosInstance.get<CategoriesResponse[]>("/categories");
  return data;
};

/**
 * Create a new category.
 * @param categoryName - The name of the new category.
 * @returns The created category.
 */
export const createCategory = async (
  categoryName: string
): Promise<CategoriesResponse> => {
  const newCategory: NewCategory = { name: categoryName };
  const { data } = await axiosInstance.post<CategoriesResponse>(
    "/categories",
    newCategory
  );
  return data;
};

/**
 * Fetch a category by its ID.
 * @param ctx - The query context containing the category ID.
 * @returns The fetched category.
 */
export const fetchCategoryById = async (
  ctx: QueryFunctionContext
): Promise<CategoriesResponse> => {
  const [, categoryId] = ctx.queryKey;
  const { data } = await axiosInstance.get<CategoriesResponse>(
    `/categories/${categoryId}`
  );
  return data;
};

/**
 * Update an existing category.
 * @param updatedCategory - The updated category data.
 * @returns The updated category.
 */
export const updateCategory = async (
  updatedCategory: UpdateCategoryRequest
): Promise<CategoriesResponse> => {
  const updatedCategoryName = { name: updatedCategory.name };
  const { data } = await axiosInstance.patch<CategoriesResponse>(
    `/categories/${updatedCategory.id}`,
    updatedCategoryName
  );
  return data;
};

/**
 * Delete a category.
 * @param categoryID - The ID of the category to delete.
 * @returns The response from the server.
 */
export const deleteCategory = async (
  categoryID: string
): Promise<CategoriesResponse> => {
  const { data } = await axiosInstance.delete<CategoriesResponse>(
    `/categories/${categoryID}`
  );
  return data;
};
