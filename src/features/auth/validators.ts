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
  email: z.email("Nieprawidłowy adres email."),
  password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
  username: z
    .string()
    .min(5, "Nazwa uzytkownika musi zawierać przynajmniej 5 znaków"),
});

//Signin
export type SigninAuthForm = z.infer<typeof SigninAuthSchema>;

export const signinFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

export const SigninAuthSchema = z.object({
  email: z.email("Nieprawidłowy adres email."),
  password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
});
