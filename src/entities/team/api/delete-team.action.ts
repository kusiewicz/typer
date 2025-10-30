import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { eq } from "drizzle-orm";
import { RemoveTeamSchema } from "../model/schema";
import { adminMiddleware } from "~/features/auth/middlewares/check-admin.middleware";

export const deleteTeam = createServerFn({
  method: "POST",
})
  .middleware([adminMiddleware])
  .inputValidator(zodValidator(RemoveTeamSchema))
  .handler(async ({ data }) => {
    try {
      const team = await db
        .select({ id: teams.id })
        .from(teams)
        .where(eq(teams.id, data.id))
        .limit(1);

      if (team.length === 0) {
        throw new Error("Team not found.");
      }

      await db.delete(teams).where(eq(teams.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to remove team. Please try again.");
    }
  });
