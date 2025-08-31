import { createFileRoute } from "@tanstack/react-router";
import { getAllTeams } from "~/features/main/team-form/actions";

import { AddTeamPage } from "~/pages/add-team/add-team";

// TODO only admin should be able to do this
export const Route = createFileRoute("/_authed/add-team")({
  component: AddTeam,
  loader: async () => getAllTeams(),
});

function AddTeam() {
  return <AddTeamPage />;
}
