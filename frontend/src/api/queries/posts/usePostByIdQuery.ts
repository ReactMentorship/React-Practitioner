import { useQuery } from '@tanstack/react-query';
import { getPostById } from '../../services/posts/getPostById';
import { QUERY_KEYS } from '../../react-query-keys';

/**
 * React Query hook to fetch a post by ID.
 * @param id - The ID of the post.
 * @returns Query result containing the post data.
 */

export const usePostByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST, id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};
