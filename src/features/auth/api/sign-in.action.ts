import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";
import { AuthService } from "~/features/auth/models/auth-service";
import { SigninAuthSchema } from "../types";

export const signin = createServerFn({
  method: "POST",
})
  .inputValidator((data: FormData) => {
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
