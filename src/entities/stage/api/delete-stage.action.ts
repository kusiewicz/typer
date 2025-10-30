import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { stages } from "~/db/schema";
import { eq } from "drizzle-orm";
import { RemoveStageSchema } from "../model/schema";
import { adminMiddleware } from "~/features/auth/middlewares/check-admin.middleware";

export const deleteStage = createServerFn({
  method: "POST",
})
  .middleware([adminMiddleware])
  .inputValidator(zodValidator(RemoveStageSchema))
  .handler(async ({ data }) => {
    try {
      await db.delete(stages).where(eq(stages.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to remove stage. Please try again.");
    }
  });
