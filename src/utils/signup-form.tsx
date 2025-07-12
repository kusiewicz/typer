import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { AuthForm, AuthSchema } from "./auth-form-opts";
import { zodValidator } from "./zod-validator-server";
import { getSupabaseServerClient } from "./supabase";

export const signupFn = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(AuthSchema)(data);
  })
  .handler(async ({ data }: { data: FormData }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email: data.get("email") as AuthForm["email"],
      password: data.get("password") as AuthForm["password"],
      options: {
        emailRedirectTo: "http://localhost:3000/signin",
      },
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    throw redirect({
      to: "/confirm-email",
    });
  });

// export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
//   async () => {
//     return getFormData();
//   }
// );
