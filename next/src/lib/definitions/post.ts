import { z } from "zod";

import { CategoriesResponse } from "./category";
import { CommentResponse } from "./comment";

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  image: z
    .string()
    .url("Image must be a valid URL")
    .min(1, "Image is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be at most 50 characters"),
});

export type PostFormState =
  | {
      errors?: {
        title?: string[];
        image?: string[];
        description?: string[];
        category?: string[];
      };
      message?: string;
      post?: PostResponse;
    }
  | undefined;

export type NewPost = {
  title: string;
  image: string;
  description: string;
  category: string;
};

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
};

export type SelectedPost = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
};

export interface PostsResponse {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostResponse {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
