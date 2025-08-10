import { db } from "~/db";
import { getSupabaseServerClient } from "../supabase/server";
import { profiles } from "~/db/schema";
import { eq } from "drizzle-orm";

export const requireUser = async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};

export const requireAdmin = async (userId: string) => {
  const profile = await db
    .select({
      isAdmin: profiles.isAdmin,
    })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  if (profile.length === 0 || !profile[0].isAdmin) {
    throw new Error("Unauthorized");
  }
};
