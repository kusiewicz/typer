import { createServerFn } from "@tanstack/react-start";
import { getFormData } from "@tanstack/react-form/start";
import { AuthForm, AuthSchema } from "./auth-form-opts";
import { zodValidator } from "./zod-validator-server";
import { getSupabaseServerClient } from "./supabase";

export const signinFn = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(AuthSchema)(data);
  })
  .handler(async ({ data }: { data: FormData }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.get("email") as AuthForm["email"],
      password: data.get("password") as AuthForm["password"],
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });

// export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
//   async () => {
//     return getFormData();
//   }
// );
