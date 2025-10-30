import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { stages } from "~/db/schema";
import { checkUserMiddleware } from "~/features/auth/middlewares/check-user-middleware";

export const getAllStages = createServerFn({
  method: "GET",
})
  .middleware([checkUserMiddleware])
  .handler(async () => {
    try {
      const stagesData = await db.select().from(stages);

      return { data: stagesData, success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to fetch stages. Please try again.");
    }
  });
