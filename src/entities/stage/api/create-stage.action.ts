import { createServerFn } from "@tanstack/react-start";
import { zodFormDataValidator } from "~/shared/lib/zod-validator-server";
import { db } from "~/db";
import { stages } from "~/db/schema";
import { eq } from "drizzle-orm";
import { StageSchema } from "../model/schema";
import { requireAdmin } from "~/features/auth/lib/auth.guard";

export const createStage = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(StageSchema)(data);
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const existingStage = await db
        .select()
        .from(stages)
        .where(eq(stages.name, data.name))
        .limit(1);

      if (existingStage.length > 0) {
        throw new Error("Stage with this name already exists.");
      }

      await db.insert(stages).values({
        name: data.name,
        multiplier: data.multiplier,
      });

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to create stage. Please try again.");
    }
  });
