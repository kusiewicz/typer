import { createFileRoute } from "@tanstack/react-router";
import { getAllTeams } from "~/features/main/actions";
import { TeamForm } from "~/features/main/components/team-form";
import { createColumnHelper } from "@tanstack/react-table";
import { TeamFormProps } from "~/features/main/validators";
import { Table } from "~/components/table";
import { Spacer } from "~/components/spacer";

// TODO only admin should be able to do this
export const Route = createFileRoute("/_authed/add-team")({
  component: AddTeamPage,
  loader: async () => getAllTeams(),
});

function AddTeamPage() {
  const { data: teamsData } = Route.useLoaderData();

  const columnHelper = createColumnHelper<TeamFormProps>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Country",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("countryCode", {
      header: "Country code",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];

  return (
    <>
      <TeamForm />
      <Spacer />
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg w-[80%]">
        <Table data={teamsData} columns={columns} />
      </div>
    </>
  );
}
