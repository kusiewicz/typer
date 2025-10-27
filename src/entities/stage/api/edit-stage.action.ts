import { createServerFn } from "@tanstack/react-start";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { stages } from "~/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { EditStageSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const editStage = createServerFn({
  method: "POST",
})
  .inputValidator((data: FormData) => {
    return zodFormDataValidator(EditStageSchema)(data);
  })
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      const existingStage = await db
        .select()
        .from(stages)
        .where(and(eq(stages.name, data.name), ne(stages.id, data.id)))
        .limit(1);

      if (existingStage.length > 0) {
        throw new Error("Stage with this name already exists.");
      }

      await db
        .update(stages)
        .set({ name: data.name, multiplier: data.multiplier.toString() })
        .where(eq(stages.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to update stage. Please try again.");
    }
  });
