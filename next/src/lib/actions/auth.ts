import { createUser, signInUser, logout as signOut } from "@/lib/api/auth";
import {
  AuthFormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/definitions/auth";
import { AxiosError } from "axios";

export async function signup(
  _: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  const newUser = { password, username: email };

  // 3. Insert the user into the database or call an Auth Provider's API
  const { message } = await createUser(newUser).catch((error: AxiosError) => {
    throw new Error((error.response?.data as { message?: string })?.message);
  });

  const succesMessage = "User registered and logged in";

  if (message !== succesMessage) {
    return {
      message,
    };
  }


  return {};
}

export async function login(
  _: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const user = { password, username: email };
  const { message } = await signInUser(user).catch(
    (error: AxiosError) => {
      throw new Error((error.response?.data as { message?: string })?.message);
    }
  );
  if (message !== "Login successful") {
    return {
      message: message || "Something went wrong. Please try again later.",
    };
  }

  return {};
}

export async function logout() {
  await signOut();
}