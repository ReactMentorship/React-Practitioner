import { addPost, updatePost } from "@/lib/api/postsApi";
import { PostFormSchema, PostFormState } from "@/lib/definitions";

export async function createPost(formData: FormData): Promise<PostFormState> {
  // 1. Validate form fields
  const validatedFields = PostFormSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    image: formData.get("image"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { title, category, description, image } = validatedFields.data;
  const newPost = { title, category, description, image };

  // 3. Insert the post into the database
  const post = await addPost(newPost);

  if (!post) {
    return {
      message: "An error occurred while creating the post.",
    };
  }

  return { post };
}

export async function editPost(formData: FormData): Promise<PostFormState> {
  // 1. Validate form fields
  const validatedFields = PostFormSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    image: formData.get("image"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { title, category, description, image } = validatedFields.data;
  const id = formData.get("id");
  const newPost = {
    title,
    category,
    description,
    image,
  };

  if (!id) {
    return {
      message: "An error occurred while updating the post.",
    };
  }

  // 3. Insert the post into the database
  const post = await updatePost(id as string, newPost);

  if (!post) {
    return {
      message: "An error occurred while updating the post.",
    };
  }

  return { post };
}
