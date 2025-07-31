"use client";

import {
  createCategoryAction,
  editCategoryAction,
} from "@/lib/actions/category";
import {
  CategoriesResponse,
  CategoryFormState,
} from "@/lib/definitions/category";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface CategoryFormProps {
  category?: CategoriesResponse;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [state, action, pending] = useActionState(
    async (_: CategoryFormState, formData: FormData) => {
      if (!category?.id) {
        return await createCategoryAction(formData);
      } else {
        formData.append("id", category.id);
        return await editCategoryAction(formData);
      }
    },
    undefined
  );

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    if (state?.category) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (category) {
        queryClient.invalidateQueries({ queryKey: ["category", category?.id] });
      }
      router.back();
    }
  }, [queryClient, category, state?.category, router]);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {category?.id ? "Edit Category" : "Create Category"}
      </DialogTitle>
      <DialogContent>
        <form action={action}>
          <div className="flex flex-col gap-3 py-2">
            <TextField
              id="name"
              name="name"
              placeholder="Enter name"
              label="Name"
              fullWidth
              error={Boolean(state?.errors?.name)}
              helperText={state?.errors?.name?.[0] || " "}
              defaultValue={state?.values?.name ?? category?.name ?? ""}
            />
            {state?.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
            <div className="flex justify-center">
              <Button
                disabled={pending}
                type="submit"
                size="medium"
                variant="contained"
              >
                {pending
                  ? "Submitting..."
                  : category?.id
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
