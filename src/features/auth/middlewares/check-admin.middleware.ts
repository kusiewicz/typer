import { createMiddleware } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { profiles } from "~/db/schema";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";

export const adminMiddleware = createMiddleware().server(async ({ next }) => {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const profile = await db
    .select({
      isAdmin: profiles.isAdmin,
    })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  if (profile.length === 0 || !profile[0].isAdmin) {
    throw new Error("Unauthorized");
  }

  return next();
});
