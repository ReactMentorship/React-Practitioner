import { Post } from '../../../types';
import axiosInstance from '../../axios';

/**
 * Fetch a single post by its ID.
 * @param id - The ID of the post.
 * @returns A Post object.
 */

export const getPostById = async (id: string): Promise<Post> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
};
