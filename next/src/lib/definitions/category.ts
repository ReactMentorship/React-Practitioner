import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
});

export type CategoryFormState =
  | {
      errors?: {
        name?: string[];
      };
      message?: string;
      category?: CategoriesResponse;
      values?: { name?: string };
    }
  | undefined;

export interface CategoriesResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewCategory {
  name: string;
}

export interface UpdateCategoryRequest extends NewCategory {
  id: string;
}

