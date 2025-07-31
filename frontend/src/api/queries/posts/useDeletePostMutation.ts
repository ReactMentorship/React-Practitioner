import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNotificationStore } from "../../../stores/notificationStore";
import { ExtendedAxiosError, Post } from "../../../types";
import { QUERY_KEYS } from "../../react-query-keys";
import { deletePost } from "../../services/posts/deletePost";

/**
 * React Query mutation hook to delete a post.
 * @returns Mutation result for deleting a post.
 */

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const notify = useNotificationStore((state) => state.notify);

  return useMutation({
    mutationFn: (post: Post) => deletePost(post.id),
    onSuccess: async (_, post) => {
      const invalidList = [
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POST, post.id],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS_BY_CATEGORY, post.category],
        }),
      ];
      await Promise.all(invalidList);
      notify("Post successfully deleted.", "success");
    },
    onError: (error: ExtendedAxiosError) => {
      notify(error.response.data.message, "error");
    },
  });
};
