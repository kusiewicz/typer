import { createFileRoute } from "@tanstack/react-router";
import { teamsQueryOptions } from "~/entities/team/api/get-teams.query";
import { TeamsPage } from "~/pages/teams.page";

export const Route = createFileRoute("/_authed/teams")({
  component: TeamsPage,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(teamsQueryOptions);
  },
});
