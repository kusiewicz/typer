import { createMiddleware } from "@tanstack/react-start";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";

export const checkUserMiddleware = createMiddleware().server(
  async ({ next }) => {
    const supabase = getSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return next();
  }
);
