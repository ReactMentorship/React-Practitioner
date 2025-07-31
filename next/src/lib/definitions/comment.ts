import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z
    .string()
    .min(1, "Comment is required")
    .max(50, "Name must be at most 50 characters"),
});

export type CommentFormState =
  | {
      errors?: {
        content?: string[];
      };
      message?: string;
      comment?: CommentResponse;
      values?: { content?: string };
    }
  | undefined;

export type Comment = {
  id: string;
  author: string;
  content: string;
};

export interface CommentResponse {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewComment {
  author: string;
  content: string;
}
