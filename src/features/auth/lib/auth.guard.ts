import { db } from "~/db";
import { profiles } from "~/db/schema";
import { eq } from "drizzle-orm";
import { getSupabaseServerClient } from "~/shared/utils/supabase/server";

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

export const requireAdmin = async () => {
  const user = await requireUser();

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
};
