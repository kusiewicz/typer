import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";
import { AuthService } from "~/features/auth/models/auth-service";
import { SignupAuthSchema } from "../types";

export const signup = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(SignupAuthSchema)(data);
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const authService = new AuthService(supabase);

    const credentials = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    const { error } = await authService.signUp(credentials);

    if (error) {
      throw error;
    }

    throw redirect({
      to: "/confirm-email",
    });
  });
