import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../react-query-keys";
import { ExtendedAxiosError, Post } from "../../../types";
import { createPost } from "../../services/posts/createPost";
import { useNotificationStore } from "../../../stores/notificationStore";

/**
 * React Query mutation hook to create a new post.
 * @returns Mutation result for creating a post.
 */

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const notify = useNotificationStore((state) => state.notify);

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (data: Post) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS_BY_CATEGORY, data.category],
        }),
      ]);
      notify("Post successfully created.", "success");
    },
    onError: (error: ExtendedAxiosError) => {
      notify(error.response.data.message, "error");
    },
  });
};
