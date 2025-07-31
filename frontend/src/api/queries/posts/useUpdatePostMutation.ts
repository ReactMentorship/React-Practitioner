import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../../../stores/notificationStore";
import { ExtendedAxiosError, UpdatePostPayload } from "../../../types";
import { QUERY_KEYS } from "../../react-query-keys";
import { updatePost } from "../../services/posts/updatePost";

/**
 * React Query mutation hook to update a post.
 * @returns Mutation result for updating a post.
 */

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const notify = useNotificationStore((state) => state.notify);

  return useMutation({
    mutationFn: (post: UpdatePostPayload) => updatePost(post),
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

      notify("Post successfully updated.", "success");
    },
    onError: (error: ExtendedAxiosError) => {
      notify(error.response.data.message, "error");
    },
  });
};
