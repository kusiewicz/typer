import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodFormDataValidator } from "~/utils/zod/zod-validator-server";
import { getSupabaseServerClient } from "~/utils/supabase/server";
import { SigninAuthSchema, SignupAuthSchema } from "~/features/auth/validators";
import { AuthService } from "~/features/auth/models/auth-service";

export const signup = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(SignupAuthSchema)(data);
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const authService = new AuthService(supabase);

    const { error } = await authService.signUp({
      email: data.email,
      password: data.password,
      username: data.username,
      emailRedirectTo: "",
    });

    if (error) {
      throw error;
    }

    throw redirect({
      to: "/confirm-email",
    });
  });

export const signin = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(SigninAuthSchema)(data);
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const authService = new AuthService(supabase);

    const { error } = await authService.signIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw error;
    }

    throw redirect({
      to: "/",
    });
  });
