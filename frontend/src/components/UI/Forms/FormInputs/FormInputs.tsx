import { Fragment } from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";

import {  Inputs } from "../../../../types";

interface FormInputsProps {
  inputs: Inputs;
  formData: { [key: string]: string };
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
}

const FormInputs = ({ inputs, formData, handleChange }: FormInputsProps) => {
  return (
    <>
      {inputs.map((input) => (
        <Fragment key={input.id}>
          {(input.type === "text" || input.type === "email") && (
            <>
              <TextField
                required
                fullWidth
                id={input.id}
                margin="dense"
                variant="outlined"
                name={input.name}
                label={input.label}
                type={input.type}
                onChange={handleChange}
                sx={{ paddingBottom: 2 }}
                value={formData[input.name]}
              />
            </>
          )}
          {input.type === "menu" && (
            <TextField
              select
              required
              fullWidth
              sx={{ pb: 2 }}
              margin="dense"
              id={input.id}
              name={input.name}
              label={input.label}
              onChange={handleChange}
              value={`${formData[input.name]}`}
            >
              {input.options?.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default FormInputs;
