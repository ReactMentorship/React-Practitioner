import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { useAddCommentMutation } from "../../../api/queries/posts/useAddCommentMutation";
import { errorMessage } from "../../../common/utils";
import { RootState } from "../../../stores/authStore";

interface IFormInput {
  comment: string;
}
interface CommentsProps {
  postID: string;
  getSelectedPost: () => void;
}

const defaultValues = { comment: "" };

function AddCommentForm({ postID, getSelectedPost }: CommentsProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const { mutate: createComment, isPending: loading } = useAddCommentMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<IFormInput> = async ({ comment }) => {
    const newComment = {
      id: postID,
      author: user?.name as string,
      content: comment,
    };
    createComment(newComment, {
      onSettled: (data) => {
        if (data) {
          reset();
          // Calling this function is not strictly necessary,
          // as the mutation automatically invalidates the relevant query and triggers a refetch.
          // In this case, it is included for educational purposes.
          getSelectedPost();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required
        fullWidth
        multiline
        type="text"
        margin="dense"
        id="comment-id"
        variant="standard"
        label="Write a comment"
        {...register("comment")}
        error={!!errors.comment}
      />
      {errorMessage(errors?.comment?.type)}
      <Button type="submit" variant="contained" loading={loading}>
        Add
      </Button>
    </form>
  );
}

export default AddCommentForm;
