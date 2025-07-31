import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ButtonType, InputType } from "../../../../types";

// Props for the form
type DynamicFormProps = {
  inputs: InputType[];
  buttons: ButtonType[];
  defaultValues: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
};

/**
 * DynamicForm is a reusable and configurable form component built with React Hook Form and Material UI.
 *
 * It dynamically renders form fields and buttons based on the configuration passed via props.
 * The component supports both text inputs and autocomplete fields, along with validation rules,
 * default values, and dynamic button behavior (including reset functionality).
 *
 * Features:
 * - Dynamically renders form fields based on an array of input definitions.
 * - Supports validation rules for each input using React Hook Form.
 * - Handles both text and autocomplete input types.
 * - Automatically resets the form when `defaultValues` change.
 * - Renders configurable buttons with support for `submit`, `reset`, and custom `onClick` handlers.
 *
 * Props:
 * - `inputs`: An array of input definitions (name, label, type, rules, etc.).
 * - `defaultValues`: An object containing initial values for the form fields.
 * - `onSubmit`: A callback function triggered when the form is submitted.
 * - `buttons`: An array of button definitions, including type, label, and optional click handlers.
 *
 * Example usage:
 * ```tsx
 * <DynamicForm
 *   inputs={formInputs}
 *   defaultValues={{ username: "", email: "" }}
 *   onSubmit={(data) => console.log(data)}
 *   buttons={[
 *     { name: "Submit", type: "submit", variant: "contained" },
 *     { name: "Reset", type: "reset", variant: "outlined" }
 *   ]}
 * />
 * ```
 *
 * Notes:
 * - The `reset` button type is handled internally to reset the form to its initial state.
 * - Validation errors are displayed inline using Material UI's `TextField` and `Autocomplete` components.
 * - The component is designed to be flexible and easily integrated into various form-driven UIs.
 */

export default function DynamicForm({
  inputs,
  buttons,
  defaultValues,
  onSubmit,
}: DynamicFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    buttonProps: ButtonType
  ) => {
    if (buttonProps.type === "reset") {
      reset(defaultValues);
    }
    if (buttonProps.onClick) buttonProps.onClick(e);
  };

  // Reset form
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input) => (
        <Box key={input.name} mb={2}>
          {input.type === "text" && (
            <Controller
              name={input.name}
              control={control}
              defaultValue=""
              rules={input.rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={input.label}
                  fullWidth
                  error={!!errors[input.name]}
                  helperText={errors[input.name]?.message as string}
                />
              )}
            />
          )}
          {input.type === "autocomplete" && (
            <Controller
              name={input.name}
              control={control}
              defaultValue=""
              rules={input.rules}
              render={({ field }) => (
                <Autocomplete
                  options={input.options || []}
                  value={field.value || ""}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={input.label}
                      fullWidth
                      error={!!errors[input.name]}
                      helperText={errors[input.name]?.message as string}
                    />
                  )}
                />
              )}
            />
          )}
        </Box>
      ))}

      {/* Render dynamic buttons */}
      <Box display="flex" gap={2} mt={3}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            {...button}
            onClick={(e) => handleButtonClick(e, button)}
          >
            {button.name}
          </Button>
        ))}
      </Box>
    </form>
  );
}
