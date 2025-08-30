import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getSupabaseServerClient } from "~/utils/supabase/server";

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
