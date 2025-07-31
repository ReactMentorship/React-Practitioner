import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

import { GenericObject } from "../../types";

interface UseobjectProps {
  emptyInputs: GenericObject;
  initialState?: GenericObject;
  handleClose: () => void;
  handleSubmit: (GenericObject: GenericObject) => void;
}

const useForm = ({
  emptyInputs,
  initialState,
  handleClose,
  handleSubmit,
}: UseobjectProps) => {
  const [formData, setFormData] = useState<GenericObject>(emptyInputs);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({...formData});
  };

  const handleCancel = () => {
    setFormData(emptyInputs);
    handleClose();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initialState) setFormData(initialState);
  }, [initialState]);

  return {
    formData,
    onSubmit,
    handleChange,
    handleCancel,
  };
};

export default useForm;
