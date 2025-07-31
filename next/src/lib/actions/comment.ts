import { createComment } from "@/lib/api/commentsApi";
import { CommentFormSchema, CommentFormState } from "@/lib/definitions/comment";

export async function createCommentAction(
  formData: FormData
): Promise<CommentFormState> {
  // 1. Validate form fields
  const validatedFields = CommentFormSchema.safeParse({
    content: formData.get("content"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { content } = validatedFields.data;
  const newComment = { content, author: "Juan" };
  const postId = formData.get("postId") as string;

  if (!postId) {
    return {
      message: "An error occurred while creating the comment.",
    };
  }

  // 3. Insert the category into the database
  const comment = await createComment(postId, newComment);

  if (!comment) {
    return {
      message: "An error occurred while creating the category.",
    };
  }

  return { comment };
}
