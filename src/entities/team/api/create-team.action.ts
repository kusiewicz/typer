import { createServerFn } from "@tanstack/react-start";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { TeamSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const createTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(TeamSchema)(data);
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const existingTeam = await db
        .select()
        .from(teams)
        .where(
          and(
            eq(teams.name, data.name),
            eq(teams.countryCode, data.countryCode)
          )
        )
        .limit(1);

      if (existingTeam.length > 0) {
        throw new Error("Team with this name and country code already exists.");
      }

      const existingName = await db
        .select()
        .from(teams)
        .where(eq(teams.name, data.name))
        .limit(1);

      if (existingName.length > 0) {
        throw new Error("Team with this name already exists.");
      }

      const existingCountryCode = await db
        .select()
        .from(teams)
        .where(eq(teams.countryCode, data.countryCode))
        .limit(1);

      if (existingCountryCode.length > 0) {
        throw new Error("Team with this country code already exists.");
      }

      await db.insert(teams).values({
        name: data.name,
        countryCode: data.countryCode,
      });

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to create team. Please try again.");
    }
  });
