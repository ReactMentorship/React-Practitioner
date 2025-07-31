import { Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../../api/queries/auth/createUser";
import { loginUser } from "../../../api/queries/auth/login";
import { fetchUser } from "../../../auth/authSlice";
import { AppDispatch } from "../../../stores/authStore";
import { useNotificationStore } from "../../../stores/notificationStore";
import {
  ExtendedAxiosError,
  GenericObject,
  Inputs,
  LoginPayload,
  RegisterPayload,
} from "../../../types";
import CustomForm from "../../UI/Forms/CustomForm";
import Loading from "../../UI/Loading";
import { PageContainer } from "./LoginPage.styles";

const loginEmptyInputs = { username: "", password: "" };

const signUpEmptyInputs = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const inputs: Inputs = [
  {
    id: "username_id",
    name: "username",
    label: "User Name",
    type: "text",
  },
  {
    id: "first_name_id",
    name: "firstname",
    label: "First Name",
    type: "text",
  },
  {
    id: "last_name_id",
    name: "lastname",
    label: "Last Name",
    type: "text",
  },
  {
    id: "password_id",
    name: "password",
    label: "Password",
    type: "text",
  },
  {
    id: "confirm_password_id",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "text",
  },
];

const getFormInputs = (key: "login" | "signUp") => {
  const inputKeys = Object.keys(
    key === "login" ? loginEmptyInputs : signUpEmptyInputs
  );
  const selectedInputs = inputs.filter((i) => inputKeys.includes(i.name));
  return selectedInputs;
};

const loginInputs = getFormInputs("login");
const signUpInputs = getFormInputs("signUp");

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notify = useNotificationStore((state) => state.notify);
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState<"login" | "signUp">("login");

  const switchForm = () => {
    setSelectedForm((prev) => (prev === "login" ? "signUp" : "login"));
  };

  const onError = (error: ExtendedAxiosError) => {
    setLoading(false);
    notify(error.response?.data.message, "error");
  };

  const handleLogin = async (formData: GenericObject) => {
    const user = { ...formData } as LoginPayload;

    const onSuccess = async () => {
      notify("Welcome back!", "success");
      await dispatch(fetchUser()); // Update Redux state with user info
      navigate("/");
    };

    setLoading(true);
    await loginUser({ user, onSuccess, onError });
  };

  const handleSignUp = async (formData: GenericObject) => {
    const formValues = { ...formData } as {
      username: string;
      password: string;
      firstname: string;
      lastname: string;
      confirmPassword: string;
    };

    const isPasswordCorrect =
      formValues.password === formValues.confirmPassword;
    if (!isPasswordCorrect) {
      return notify("Password is not correct", "error");
    }

    const newUser: RegisterPayload = {
      name: `${formValues.firstname} ${formValues.lastname}`,
      username: formValues.username,
      password: formValues.password,
    };

    const onSuccess = async () => {
      notify("Welcome!", "success");
      await dispatch(fetchUser()); // Update Redux state with user info
      navigate("/");
    };

    setLoading(true);
    await createUser({ newUser, onSuccess, onError });
  };

  const handleSubmit = (formData: GenericObject) => {
    if (selectedForm === "login") handleLogin(formData);
    else handleSignUp(formData);
  };

  if (loading) return <Loading />;

  return (
    <PageContainer container>
      <Grid size={4}>
        {selectedForm === "login" ? (
          <CustomForm
            title="Login"
            inputs={loginInputs}
            emptyInputs={loginEmptyInputs}
            cancelButtonProps={{ name: "Sign Up" }}
            submitButtonProps={{ name: "Login" }}
            handleClose={switchForm}
            handleSubmit={handleSubmit}
          />
        ) : (
          <CustomForm
            title="Sign Up"
            inputs={signUpInputs}
            emptyInputs={signUpEmptyInputs}
            cancelButtonProps={{ name: "Login" }}
            submitButtonProps={{ name: "Sign Up" }}
            handleClose={switchForm}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </PageContainer>
  );
}

export default LoginPage;
