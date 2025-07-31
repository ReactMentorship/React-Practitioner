import { CreateCommentPayload } from "../../../types";
import axiosInstance from "../../axios";

/**
 * Add a comment to a specific post.
 * @param postId - The ID of the post to comment on.
 * @param comment - The comment payload.
 * @returns The created Comment object.
 */

export const addCommentToPost = async (
  payload: CreateCommentPayload
): Promise<Comment> => {
  const { id, ...comment } = payload;
  const { data } = await axiosInstance.post(`/posts/${id}/comments`, comment);
  return data;
};
