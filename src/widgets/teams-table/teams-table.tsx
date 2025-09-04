import { createColumnHelper } from "@tanstack/react-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { teamsQueryOptions } from "~/entities/team/api/get-teams.query";
import { COLUMN_SIZES, Table } from "~/shared/ui/table";
import { TeamFormProps } from "~/entities/team/model/schema";
import { ActionCell } from "./ui/action-cell";

export const TeamsTable = () => {
  const { data: teamsData } = useSuspenseQuery(teamsQueryOptions);

  const columnHelper = createColumnHelper<TeamFormProps>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Country",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: {
        sizeClass: COLUMN_SIZES.grid6,
      },
    }),
    columnHelper.accessor("countryCode", {
      header: "Country code",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: {
        sizeClass: COLUMN_SIZES.grid3,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => <ActionCell cellInfo={info} />,
      meta: {},
    }),
  ];

  return <Table data={teamsData.data} columns={columns} />;
};
