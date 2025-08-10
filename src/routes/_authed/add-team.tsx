import { createFileRoute } from "@tanstack/react-router";
import { getAllTeams } from "~/features/main/actions";
import { TeamForm } from "~/features/main/components/team-form";

// TODO only admin should be able to do this
export const Route = createFileRoute("/_authed/add-team")({
  component: AddTeamPage,
  loader: async () => getAllTeams(),
});

function AddTeamPage() {
  const teams = Route.useLoaderData();

  console.log("teams", teams);

  return <TeamForm />;
}
