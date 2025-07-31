"use client";

import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { createPost, editPost } from "@/lib/actions/post";
import { fetchCategories } from "@/lib/api/categoriesApi";
import {
  PostFormSchema,
  PostFormState,
  PostResponse,
} from "@/lib/definitions/post";

interface PostFormProps {
  post?: PostResponse;
}

export function PostForm({ post }: PostFormProps) {
  const queryClient = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const router = useRouter();

  const [state, action, pending] = useActionState(
    async (_: PostFormState, formData: FormData) => {
      const values = Object.fromEntries(formData.entries());

      if (!post?.id) {
        const result = await createPost(formData);
        return { ...result, values };
      }

      formData.append("id", post.id);
      const result = await editPost(formData);
      return { ...result, values };
    },
    undefined
  );

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    if (state?.post) {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] });
      queryClient.invalidateQueries({ queryKey: ["postsByCategory"] });
      router.back();
    }
  }, [queryClient, state?.post, router]);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{post?.id ? "Edit Post" : "Create Post"}</DialogTitle>
      <DialogContent>
        <form action={action}>
          <div className="flex flex-col gap-3 py-2">
            {Object.keys(PostFormSchema.shape).map((field) => (
              <div key={field}>
                {field === "category" && categories ? (
                  <Autocomplete
                    options={categories || []}
                    getOptionLabel={(option) => option.name || ""}
                    defaultValue={
                      categories?.find(
                        (cat) =>
                          cat.name ===
                          (post?.[field as keyof PostResponse] as
                            | string
                            | undefined)
                      ) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        placeholder={`Select ${field}`}
                        error={Boolean(
                          state?.errors?.[field as keyof typeof state.errors]
                        )}
                        helperText={
                          state?.errors?.[
                            field as keyof typeof state.errors
                          ]?.[0] || " "
                        }
                      />
                    )}
                  />
                ) : (
                  <TextField
                    id={field}
                    name={field}
                    placeholder={`Enter ${field}`}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    fullWidth
                    error={Boolean(
                      state?.errors?.[field as keyof typeof state.errors]
                    )}
                    helperText={
                      state?.errors?.[
                        field as keyof typeof state.errors
                      ]?.[0] || " "
                    }
                    defaultValue={post?.[field as keyof PostResponse] ?? ""}
                  />
                )}
              </div>
            ))}
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
                  : post?.id
                  ? "Update Post"
                  : "Create Post"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
