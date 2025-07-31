import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import * as React from "react";

import { validator } from "../../../../common/utils";
import { Category, FormInputs, Post } from "../../../../types";
import { useCreatePostMutation } from "../../../../api/queries/posts/useCreatePostMutation";
import { useUpdatePostMutation } from "../../../../api/queries/posts/useUpdatePostMutation";

const emptyInputs = {
  title: { value: "", error: "" },
  description: { value: "", error: "" },
  category: { value: "", error: "" },
  image: { value: "", error: "" },
};

interface PostFormProps {
  open: boolean;
  post: Post | null;
  categories: Category[] | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: (value: React.SetStateAction<Post | null>) => void;
}

const PostForm = ({
  open,
  post,
  categories,
  setOpen,
  setSelectedPost,
}: PostFormProps) => {
  const [formData, setFormData] = React.useState(emptyInputs);
  const { mutate: addPost, isPending: creatingPost } = useCreatePostMutation();
  const { mutate: updatePostData, isPending: updatingPost } =
    useUpdatePostMutation();

  React.useEffect(() => {
    if (!post) return;
    const existingPost = {
      title: { value: post.title, error: "" },
      description: { value: post.description, error: "" },
      category: { value: post.category ?? "", error: "" },
      image: { value: post.image, error: "" },
    };
    setFormData(existingPost);
  }, [post]);

  const handleClose = () => {
    setFormData(emptyInputs);
    setOpen(false);
    setSelectedPost(null);
  };

  const hanldeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Object.values(formData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;

    const payload = {
      title: formData.title.value,
      image: formData.image.value,
      description: formData.description.value,
      category: formData.category.value,
    };

    if (post) {
      await updatePostData({ id: post.id, ...payload });
    } else {
      await addPost(payload);
    }

    handleClose();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name as keyof FormInputs], error },
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: hanldeSubmit,
        },
      }}
      closeAfterTransition={false}
    >
      <DialogTitle variant="h5" textAlign="center">
        Create Post
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          id="title-id"
          name="title"
          label="Title"
          type="text"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.title.value}
          error={!!formData.title.error}
          helperText={formData.title.error ?? " "}
        />
        <TextField
          required
          fullWidth
          id="description-id"
          name="description"
          label="Description"
          type="text"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.description.value}
          error={!!formData.description.error}
          helperText={formData.description.error ?? " "}
        />
        <TextField
          select
          required
          fullWidth
          sx={{ pb: 2 }}
          margin="dense"
          name="category"
          label="Category"
          id="category-id"
          variant="standard"
          onBlur={handleBlur}
          onChange={handleChange}
          value={formData.category.value}
          error={!!formData.category.error}
          helperText={formData.category.error ?? " "}
        >
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          fullWidth
          id="url-id"
          name="image"
          label="URL of the image"
          type="url"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.image.value}
          error={!!formData.image.error}
          helperText={formData.image.error ?? " "}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={creatingPost || updatingPost}>
          Cancel
        </Button>
        <Button type="submit" loading={creatingPost || updatingPost}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
