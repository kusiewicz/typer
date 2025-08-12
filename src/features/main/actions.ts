import { createServerFn } from "@tanstack/react-start";
import { RemoveTeamSchema, TeamSchema } from "./validators";
import {
  zodFormDataValidator,
  zodValidator,
} from "~/utils/zod/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { requireAdmin, requireUser } from "~/utils/auth/permissions";
import { eq } from "drizzle-orm";

export const createTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(TeamSchema)(data);
  })
  .handler(async ({ data }) => {
    await requireAdmin();

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

export const removeTeam = createServerFn({
  method: "POST",
})
  .validator(zodValidator(RemoveTeamSchema))
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      await db.delete(teams).where(eq(teams.id, data.id));

      return { success: true };
    } catch (err) {
      throw err;
    }
  });
