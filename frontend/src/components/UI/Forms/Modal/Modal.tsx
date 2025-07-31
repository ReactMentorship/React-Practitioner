import {
  Breakpoint,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import useFormData from "../../../../common/hooks/useForm";
import { GenericObject, Inputs } from "../../../../types";
import FormInputs from "../FormInputs";

interface ModalProps {
  open: boolean;
  title: string;
  inputs: Inputs;
  size?: Breakpoint | false;
  emptyInputs: GenericObject;
  initialState?: GenericObject;
  cancelButtonProps: ButtonProps & { name: string };
  submitButtonProps: ButtonProps & { name: string };
  handleClose: () => void;
  handleSubmit: (formData: GenericObject) => void;
}

const Modal = ({
  open,
  size,
  title,
  inputs,
  emptyInputs,
  initialState,
  cancelButtonProps,
  submitButtonProps,
  handleClose,
  handleSubmit,
}: ModalProps) => {
  const { formData, onSubmit, handleCancel, handleChange } = useFormData({
    emptyInputs,
    initialState,
    handleClose,
    handleSubmit,
  });

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleCancel}
      maxWidth={size ?? "md"}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: onSubmit,
        },
      }}
      closeAfterTransition={false}
    >
      <DialogTitle sx={{ fontWeight: "bold", pb: 3 }}>{title}</DialogTitle>
      <DialogContent>
        <FormInputs
          inputs={inputs}
          formData={formData}
          handleChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button
          {...cancelButtonProps}
          variant={cancelButtonProps?.variant ?? "outlined"}
          onClick={handleCancel}
          type="button"
        >
          {cancelButtonProps.name}
        </Button>
        <Button
          {...submitButtonProps}
          variant={submitButtonProps?.variant ?? "contained"}
          type="submit"
        >
          {submitButtonProps.name}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
