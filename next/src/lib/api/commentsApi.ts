import axiosInstance from "./axiosConfig";
import { NewComment, CommentResponse } from "@/lib/definitions";

/**
 * Create a new comment.
 * @param postID - The ID of the post to create a comment for.
 * @param newComment - The data for the new comment.
 * @returns The created comment.
 */
export const createComment = async (
  postID: string,
  newComment: NewComment
): Promise<CommentResponse> => {
  const { data } = await axiosInstance.post<CommentResponse>(
    `/posts/${postID}/comments`,
    newComment
  );
  return data;
};
