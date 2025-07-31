import { createCategory, updateCategory } from "@/lib/api/categoriesApi";
import { CategoryFormSchema, CategoryFormState } from "@/lib/definitions/category";

export async function createCategoryAction(formData: FormData): Promise<CategoryFormState> {
  // 1. Validate form fields
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name: newCategory } = validatedFields.data;

  // 3. Insert the category into the database
  const category = await createCategory(newCategory);

  if (!category) {
    return {
      message: "An error occurred while creating the category.",
    };
  }

  return { category };
}

export async function editCategoryAction(formData: FormData): Promise<CategoryFormState> {
  // 1. Validate form fields
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name } = validatedFields.data;
  const id = formData.get("id");

  if (!id) {
    return {
      message: "An error occurred while updating the category.",
    };
  }

  // 3. Update the category in the database
  const category = await updateCategory({ id: id as string, name });

  if (!category) {
    return {
      message: "An error occurred while updating the category.",
    };
  }

  return { category };
}
