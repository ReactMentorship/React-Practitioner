"use client";

import { createCommentAction } from "@/lib/actions/comment";
import { CommentFormSchema, CommentFormState } from "@/lib/definitions";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const queryClient = useQueryClient();

  const [state, action, pending] = useActionState(
    async (_: CommentFormState, formData: FormData) => {
      formData.append("postId", postId);
      return await createCommentAction(formData);
    },
    undefined
  );

  useEffect(() => {
    if (state?.comment) {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    }
  }, [queryClient, postId, state?.comment]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-3 py-2">
        {Object.keys(CommentFormSchema.shape).map((field) => (
          <div key={field}>
            <TextField
              id={field}
              name={field}
              placeholder="Write a comment..."
              error={Boolean(
                state?.errors?.[field as keyof typeof state.errors]
              )}
              helperText={
                state?.errors?.[field as keyof typeof state.errors]?.[0] || " "
              }
              fullWidth
              multiline
              minRows={2}
            />
          </div>
        ))}

        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div className="flex justify-end">
          <Button
            disabled={pending}
            type="submit"
            size="medium"
            variant="contained"
          >
            {pending ? "Submitting..." : "Add Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
}
