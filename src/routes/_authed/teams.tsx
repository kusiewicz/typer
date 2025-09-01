import { createFileRoute } from "@tanstack/react-router";
import { getAllTeams } from "~/entities/team/api/get-teams.action";

import { TeamsPage } from "~/pages/teams.page";

// TODO only admin should be able to do this
export const Route = createFileRoute("/_authed/teams")({
  component: AddTeam,
  loader: async () => getAllTeams(),
});

function AddTeam() {
  return <TeamsPage />;
}
