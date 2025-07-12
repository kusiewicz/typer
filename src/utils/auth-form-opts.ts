import { formOptions } from "@tanstack/react-form";
import { z } from "zod/v4";

export type AuthForm = z.infer<typeof AuthSchema>;

export const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

export const AuthSchema = z.object({
  email: z.email("Nieprawidłowy adres email."),
  password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
});
