import { createServerFn } from "@tanstack/react-start";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { eq, or } from "drizzle-orm";
import { TeamSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const createTeam = createServerFn({
  method: "POST",
})
  .inputValidator((data: FormData) => {
    return zodFormDataValidator(TeamSchema)(data);
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const existingTeam = await db
        .select()
        .from(teams)
        .where(
          or(eq(teams.name, data.name), eq(teams.countryCode, data.countryCode))
        )
        .limit(1);

      if (existingTeam.length > 0) {
        if (existingTeam[0].name === data.name) {
          throw new Error("Team with this name already exists.");
        }
        if (existingTeam[0].countryCode === data.countryCode) {
          throw new Error("Team with this country code already exists.");
        }
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
