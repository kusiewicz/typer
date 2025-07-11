// import { formOptions } from "@tanstack/react-form";
// import { z } from "zod";

// export const formOpts = formOptions({
//   defaultValues: {
//     username: "",
//     email: "",
//     password: "",
//   },
// });

// export const loginSchema = z.object({
//   username: z
//     .string()
//     .min(5, "Nazwa uzytkownika musi zawierać przynajmniej 5 znaków.")
//     .max(20, "Nazwa uzytkownika musi zawierać mniej niz 20 znaków."),
//   email: z.string().email("Nieprawidłowy adres email."),
//   password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
// });

import { formOptions } from "@tanstack/react-form";
import { z } from "zod/v4";

export const formOpts = formOptions({
  defaultValues: {
    username: "",
    email: "",
    password: "",
  },
});

export const loginSchema = z.object({
  username: z
    .string("Nazwa uzytkownika jest wymagana.")
    .min(5, "Nazwa uzytkownika musi zawierać przynajmniej 5 znaków.")
    .max(20, "Nazwa uzytkownika musi zawierać mniej niz 20 znaków."),
  email: z.email("Nieprawidłowy adres email."),
  password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
});
