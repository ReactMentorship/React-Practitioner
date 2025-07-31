import { Post } from "../../../types";
import axiosInstance from "../../axios";


/**
 * Delete a post by its ID.
 * @param id - The ID of the post to delete.
 * @returns The deleted Post object.
 */

export const deletePost = async (id: string): Promise<Post> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
};
