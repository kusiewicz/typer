import { createServerFn } from "@tanstack/react-start";
import {
  zodFormDataValidator,
  zodValidator,
} from "~/utils/zod/zod-validator-server";
import { db } from "~/db";
import { teams } from "~/db/schema";
import { requireAdmin, requireUser } from "~/utils/auth/permissions";
import { eq, and, ne } from "drizzle-orm";
import { EditTeamSchema, RemoveTeamSchema, TeamSchema } from "./types";

export const createTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(TeamSchema)(data);
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const existingTeam = await db
        .select()
        .from(teams)
        .where(
          and(
            eq(teams.name, data.name),
            eq(teams.countryCode, data.countryCode)
          )
        )
        .limit(1);

      if (existingTeam.length > 0) {
        throw new Error("Team with this name and country code already exists.");
      }

      const existingName = await db
        .select()
        .from(teams)
        .where(eq(teams.name, data.name))
        .limit(1);

      if (existingName.length > 0) {
        throw new Error("Team with this name already exists.");
      }

      const existingCountryCode = await db
        .select()
        .from(teams)
        .where(eq(teams.countryCode, data.countryCode))
        .limit(1);

      if (existingCountryCode.length > 0) {
        throw new Error("Team with this country code already exists.");
      }

      await db.insert(teams).values({
        name: data.name,
        countryCode: data.countryCode,
      });

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to create team. Please try again.");
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
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Failed to fetch teams. Please try again.");
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
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to remove team. Please try again.");
    }
  });

export const editTeam = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodFormDataValidator(EditTeamSchema)(data);
  })
  .handler(async ({ data }) => {
    try {
      await requireAdmin();

      const existingName = await db
        .select()
        .from(teams)
        .where(and(eq(teams.name, data.name), ne(teams.id, data.id)))
        .limit(1);

      if (existingName.length > 0) {
        throw new Error("Team with this name already exists.");
      }

      const existingCountryCode = await db
        .select()
        .from(teams)
        .where(
          and(eq(teams.countryCode, data.countryCode), ne(teams.id, data.id))
        )
        .limit(1);

      if (existingCountryCode.length > 0) {
        throw new Error("Team with this country code already exists.");
      }

      await db
        .update(teams)
        .set({ name: data.name, countryCode: data.countryCode })
        .where(eq(teams.id, data.id));

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to update team. Please try again.");
    }
  });
