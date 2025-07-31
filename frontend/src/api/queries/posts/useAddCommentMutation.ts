import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNotificationStore } from "../../../stores/notificationStore";
import { ExtendedAxiosError } from "../../../types";
import { QUERY_KEYS } from "../../react-query-keys";
import { addCommentToPost } from "../../services/posts/addCommentToPost";

/**
 * React Query mutation hook to add a comment to a post.
 * @returns Mutation result for adding a comment.
 */

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  const notify = useNotificationStore((state) => state.notify);

  return useMutation({
    mutationFn: addCommentToPost,
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POST, id],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS_BY_CATEGORY, id],
        }),
      ]);
      notify("Comment successfully created.", "success");
    },
    onError: (error: ExtendedAxiosError) => {
      notify(error.response.data.message, "error");
    },
  });
};
