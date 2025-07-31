import { useEffect, useMemo, useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { ButtonType, InputType } from "../../../../types";

// Define the structure of the form inputs with validation rules
const INPUTS: InputType[] = [
  {
    name: "username",
    label: "User Name",
    type: "text",
    rules: {
      required: "User name is required",
      minLength: { value: 3, message: "Minimum 3 characters" },
    },
  },
  {
    name: "firstname",
    label: "First Name",
    type: "text",
    rules: {
      required: "First name is required",
      minLength: { value: 3, message: "Minimum 3 characters" },
    },
  },
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
    rules: {
      required: "Last name is required",
      minLength: { value: 3, message: "Minimum 3 characters" },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    rules: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        message:
          "Password must be strong (min 8 chars, 1 uppercase, 1 number, 1 special char)",
      },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "text",
    rules: {
      required: "Please confirm your password",
      validate: (value: string, formValues: any) =>
        value === formValues.password || "Passwords do not match",
    },
  },
  {
    name: "title",
    label: "Title",
    type: "text",
    rules: {
      required: "Title is required",
      minLength: { value: 5, message: "Minimum 3 characters" },
    },
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    rules: {
      required: "Description is required",
      minLength: { value: 10, message: "Minimum 3 characters" },
    },
  },
  {
    name: "category",
    label: "Category",
    type: "autocomplete",
    options: ["option1", "option2"],
    rules: {
      required: "Category is required",
    },
  },
  {
    name: "image",
    label: "Image URL",
    type: "text",
    rules: {
      required: "Image URL is required",
      pattern: {
        value: /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#@!$&'()*+,;=%]+$/,
        message: "Enter a valid image URL",
      },
    },
  },
];


// Initial values to prepopulate the form
const INITIAL_FORM_DATA = {
  title: "The Secret Life of Avocados",
  description:
    "An in-depth exploration of the mysterious and misunderstood fruit that changed breakfast forever.",
  category: "Fruits",
  image:
    "https://unsplash.com/photos/a-green-avocado-with-a-pink-nose-and-eyes-fUZea1IfTHk",
};

export default function GlobalForm() {
  // State to hold the form's default values
  const [formData, setFormData] = useState<Record<string, any> | undefined>();
  // State to hold the active inputs to be rendered
  const [activeInputs, setActiveInputs] = useState<InputType[]>([]);

    // Define the buttons to be rendered in the form
  const buttons: ButtonType[] = useMemo(
    () => [
      {
        name: "Submit",
        type: "submit",
        variant: "contained",
        color: "primary",
      },
      {
        name: "Cancel",
        type: "reset",
        variant: "outlined",
        color: "error",
        onClick: () => alert("Cancelled"),
      },
    ],
    []
  );

  // Handle form submission
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("Submitted data:", data);
  };

  
  useEffect(() => {
    // Simulate fetching form data from an API
    // axios.get("/api/post/:id").then((res) => {
    //   setFormData(res.data);
    // });

    // Use predefined initial data for the form
    setFormData(INITIAL_FORM_DATA);

    // Filter inputs to include only those that match keys in the form data
    const filtered = INPUTS.filter((input) =>
      Object.prototype.hasOwnProperty.call(INITIAL_FORM_DATA, input.name)
    );
    setActiveInputs(filtered);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Render the form only when formData is available */}
      {formData && Object.keys(formData).length > 0 && (
        <DynamicForm
          inputs={activeInputs}
          defaultValues={formData}
          onSubmit={handleFormSubmit}
          buttons={buttons}
        />
      )}
    </div>
  );
}
