import { Post } from "../../../types";
import axiosInstance from "../../axios";

/**
 * Fetch all posts from the server.
 * @returns An array of Post objects.
 */

export const getAllPosts = async (): Promise<Post[]> => {
  const { data } = await axiosInstance.get('/posts');
  return data;
};
