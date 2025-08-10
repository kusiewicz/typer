import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { zodValidator } from "~/utils/zod/zod-validator-server";
import { getSupabaseServerClient } from "~/utils/supabase/server";
import {
  SigninAuthSchema,
  SignupAuthForm,
  SignupAuthSchema,
} from "./validators";

export const signup = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(SignupAuthSchema)(data);
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "http://localhost:3000/signin",
        data: {
          username: data.username,
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

export const signin = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(SigninAuthSchema)(data);
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
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

export const logout = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  throw redirect({
    href: "/",
  });
});
