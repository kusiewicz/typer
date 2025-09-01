import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { requireUser } from "~/features/auth/lib/auth.guard";

export const getAllTeams = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    await requireUser();

    const teamsData = await db.select().from(teams);

    return { data: teamsData, success: true };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Failed to fetch teams. Please try again.");
  }
});
