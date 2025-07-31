import { Post, UpdatePostPayload } from "../../../types";
import axiosInstance from "../../axios";

/**
 * Update an existing post by its ID with the provided payload.
 * @param id - The ID of the post to update.
 * @param payload - The updated post data.
 * @returns The updated Post object.
 */

export const updatePost = async (payload: UpdatePostPayload): Promise<Post> => {
  const { id, ...updatedPost } = payload;
  const { data } = await axiosInstance.patch(`/posts/${id}`, updatedPost);
  return data;
};
