import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/posts/getAllPosts";
import { QUERY_KEYS } from "../../react-query-keys";

/**
 * React Query hook to fetch all posts.
 * @returns Query result containing posts data.
 */

export const usePostsQuery = (category?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getAllPosts,
    enabled: !category,
  });
};
