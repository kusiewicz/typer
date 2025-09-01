import { createServerFn } from "@tanstack/react-start";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { EditTeamSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const editTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(EditTeamSchema)(data);
  })
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      const existingName = await db
        .select()
        .from(teams)
        .where(and(eq(teams.name, data.name), ne(teams.id, data.id)))
        .limit(1);

      if (existingName.length > 0) {
        throw new Error("Team with this name already exists.");
      }

      const existingCountryCode = await db
        .select()
        .from(teams)
        .where(
          and(eq(teams.countryCode, data.countryCode), ne(teams.id, data.id))
        )
        .limit(1);

      if (existingCountryCode.length > 0) {
        throw new Error("Team with this country code already exists.");
      }

      await db
        .update(teams)
        .set({ name: data.name, countryCode: data.countryCode })
        .where(eq(teams.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to update team. Please try again.");
    }
  });
