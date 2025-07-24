import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodValidator } from "~/utils/zod/zod-validator-server";
import { getSupabaseServerClient } from "~/utils/supabase/server";
import { AuthForm, AuthSchema } from "./validators";

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
