import {
  Breakpoint,
  Button,
  ButtonProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";

import useForm from "../../../../common/hooks/useForm";
import { GenericObject, Inputs } from "../../../../types";
import FormInputs from "../FormInputs";

interface CustomFormProps {
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

const CustomForm = ({
  title,
  inputs,
  emptyInputs,
  initialState,
  cancelButtonProps,
  submitButtonProps,
  handleClose,
  handleSubmit,
}: CustomFormProps) => {
  const { formData, onSubmit, handleCancel, handleChange } = useForm({
    emptyInputs,
    initialState,
    handleClose,
    handleSubmit,
  });

  return (
    <Paper component={"form"} onSubmit={onSubmit} elevation={3}>
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
    </Paper>
  );
};

export default CustomForm;
