import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { stages } from "~/db/schema";
import { eq } from "drizzle-orm";
import { RemoveStageSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const deleteStage = createServerFn({
  method: "POST",
})
  .validator(zodValidator(RemoveStageSchema))
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      await db.delete(stages).where(eq(stages.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to remove stage. Please try again.");
    }
  });
