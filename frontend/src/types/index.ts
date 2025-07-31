import { ButtonProps } from "@mui/material";
import { AxiosError } from "axios";
import { RegisterOptions } from "react-hook-form";

/**
 * Extended Axios error type that includes a message string in the response data.
 */
export interface ExtendedAxiosError extends AxiosError {
  response: AxiosError["response"] & {
    data: {
      message: string;
    };
  };
}

// TypeScript interfaces for UI
export type Input = {
  id: string;
  name: string;
  label: string;
  type: string;
  options?: string[];
};

export type Inputs = Input[];

export type FormInputs = {
  title: Input;
  description: Input;
  category: Input;
  image: Input;
};

// Input definition type
export type InputType = {
  name: string;
  label: string;
  type: "text" | "autocomplete";
  options?: string[];
  rules?: RegisterOptions;
};

// Button definition type
export type ButtonType = ButtonProps & {
  name: string;
};

export type GenericObject = { [key: string]: any };

export interface Alert {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
}

// TypeScript interfaces for BE models

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  post_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Payload types
export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  name: string;
}

export interface CreatePostPayload {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface UpdatePostPayload {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  category?: string;
}

export interface CreateCommentPayload {
  id: string;
  author: string;
  content: string;
}

// Response types
export interface AuthResponse {
  message: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}
