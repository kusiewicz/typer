import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { checkUserMiddleware } from "~/features/auth/middlewares/check-user-middleware";

export const getAllTeams = createServerFn({
  method: "GET",
})
  .middleware([checkUserMiddleware])
  .handler(async () => {
    try {
      const teamsData = await db.select().from(teams);

      return { data: teamsData, success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to fetch teams. Please try again.");
    }
  });
