"use client";

import { signup } from "@/lib/actions/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupForm() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("password", formState.password);

    const result = await signup({}, formData);
    setPending(false);
    if (result?.errors || result?.message) {
      setError(result.message || "Error creating user");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["isAuth"] });
    router.push("/posts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div>
          <TextField
            id="name"
            name="name"
            placeholder="Your name"
            label={"Name"}
            fullWidth
            value={formState.name}
            onChange={handleChange}
            error={!!error}
            helperText={error ?? " "}
          />
        </div>
        <div className="mt-4">
          <TextField
            id="email"
            name="email"
            placeholder="m@example.com"
            label={"Email"}
            fullWidth
            value={formState.email}
            onChange={handleChange}
            error={!!error}
            helperText={error ?? " "}
          />
        </div>
        <div className="mt-4">
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            label={"Password"}
            fullWidth
            value={formState.password}
            onChange={handleChange}
            error={!!error}
            helperText={error ?? " "}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-center">
          <Button
            loading={pending}
            disabled={pending}
            type="submit"
            size="medium"
          >
            {pending ? "Submitting..." : "Sign up"}
          </Button>
        </div>
      </div>
    </form>
  );
}
