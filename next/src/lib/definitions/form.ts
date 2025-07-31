export type Input = {
  value: string;
  error: string;
};

export type FormInputs = {
  title: Input;
  description: Input;
  category: Input;
  image: Input;
};

export type FormData = { [key: string]: string };

export type Inputs = {
  id: string;
  name: string;
  label: string;
  type: string;
  options?: string[];
}[];
