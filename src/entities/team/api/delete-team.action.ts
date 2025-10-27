import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { eq } from "drizzle-orm";
import { RemoveTeamSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const deleteTeam = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(RemoveTeamSchema))
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      await db.delete(teams).where(eq(teams.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to remove team. Please try again.");
    }
  });
