import axiosInstance from '../../axios';
import { Post } from '../../../types';

/**
 * Fetch posts filtered by a specific category.
 * @param category - The category to filter posts by.
 * @returns An array of Post objects.
 */

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const { data } = await axiosInstance.get(`/posts/category/${category}`);
  return data;
};
