// src/features/auth/actions.ts

import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodValidator } from "~/utils/zod/zod-validator-server";
import { getSupabaseServerClient } from "~/utils/supabase/server";
import {
  SigninAuthSchema,
  SignupAuthForm,
  SignupAuthSchema,
} from "./validators";

export const signupFn = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(SignupAuthSchema)(data);
  })
  .handler(async ({ data }: { data: FormData }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email: data.get("email") as SignupAuthForm["email"],
      password: data.get("password") as SignupAuthForm["password"],
      options: {
        emailRedirectTo: "http://localhost:3000/signin",
        data: {
          username: data.get("username") as SignupAuthForm["username"],
        },
      },
    });

    if (error) {
      throw error;
    }

    throw redirect({
      to: "/confirm-email",
    });
  });

export const signinFn = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(SigninAuthSchema)(data);
  })
  .handler(async ({ data }: { data: FormData }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.get("email") as SignupAuthForm["email"],
      password: data.get("password") as SignupAuthForm["password"],
    });

    if (error) {
      // ✅ Po prostu rzucamy oryginalny błąd Supabase.
      throw error;
    }

    throw redirect({
      to: "/",
    });
  });

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return {
    email: data.user.email,
  };
});
