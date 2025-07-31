import { CreatePostPayload, Post } from "../../../types";
import axiosInstance from "../../axios";


/**
 * Create a new post with the provided payload.
 * @param payload - The data for the new post.
 * @returns The created Post object.
 */

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const { data } = await axiosInstance.post('/posts', payload);
  return data;
};
