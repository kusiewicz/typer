import { createServerFn } from "@tanstack/react-start";
import { TeamSchema } from "./validators";
import { zodValidator } from "~/utils/zod/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { requireAdmin, requireUser } from "~/utils/auth/permissions";

export const createTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(TeamSchema)(data);
  })
  .handler(async ({ data }) => {
    const user = await requireUser();

    await requireAdmin(user.id);

    try {
      await db.insert(teams).values({
        name: data.name,
        countryCode: data.countryCode,
      });

      return { success: true };
    } catch (err) {
      throw err;
    }
  });

export const getAllTeams = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    await requireUser();

    const teamsData = await db.select().from(teams);

    return { data: teamsData, success: true };
  } catch (err) {
    throw err;
  }
});
