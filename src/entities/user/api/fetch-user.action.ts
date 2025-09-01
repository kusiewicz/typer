import { createServerFn } from "@tanstack/react-start";
import { AuthService } from "~/features/auth/models/auth-service";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const authService = new AuthService(supabase);

  return await authService.getUser();
});
