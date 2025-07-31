import { useQuery } from "@tanstack/react-query";
import { getPostsByCategory } from "../../services/posts/getPostsByCategory";
import { QUERY_KEYS } from "../../react-query-keys";

/**
 * React Query hook to fetch posts by category.
 * @param category - The category to filter posts.
 * @returns Query result containing filtered posts.
 */

export const usePostsByCategoryQuery = (category: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS_BY_CATEGORY, category],
    queryFn: () => getPostsByCategory(category),
    enabled: !!category,
  });
};
