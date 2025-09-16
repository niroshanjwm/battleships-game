"use client";
import { getErrorMessageFromZod } from "@/utils/validation";
import { useState } from "react";
import { z } from "zod";
import Button from "../ui/button";
import Input from "@/components/ui/input";

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Must be at least 3 characters"),
});

export type RegisterFormProps = {
  className: string;
  title: string;
};

const RegisterForm = ({ className = "", title }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = usernameSchema.safeParse({ username });
    if (!result.success) {
      setError(getErrorMessageFromZod(result.error));
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <h1 className="text-center text-2xl">{title}</h1>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-white"
        >
          Username
        </label>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
