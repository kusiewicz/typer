import { formOptions } from "@tanstack/react-form";
import { z } from "zod/v4";

// Signup
export type SignupAuthForm = z.infer<typeof SignupAuthSchema>;

export const signupFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
    username: "",
  },
});

export const SignupAuthSchema = z.object({
  email: z.email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must consist of at least 8 characters."),
  username: z
    .string()
    .min(5, "Username must consist of at least 5 characters."),
});

// Signin
export type SigninAuthForm = z.infer<typeof SigninAuthSchema>;

export const signinFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

export const SigninAuthSchema = z.object({
  email: z.email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must consist of at least 8 characters."),
});
