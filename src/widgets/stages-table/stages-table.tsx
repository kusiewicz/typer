import { createColumnHelper } from "@tanstack/react-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { stagesQueryOptions } from "~/entities/stage/api/get-stages.query";
import { COLUMN_SIZES, Table } from "~/shared/ui/table";
import { StageFormProps } from "~/entities/stage/model/schema";
import { ActionCell } from "./ui/action-cell";

export const StagesTable = () => {
  const { data: stagesData } = useSuspenseQuery(stagesQueryOptions);

  const columnHelper = createColumnHelper<StageFormProps>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Stage Name",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: {
        sizeClass: COLUMN_SIZES.grid6,
      },
    }),
    columnHelper.accessor("multiplier", {
      header: "Multiplier",
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

  return <Table data={stagesData.data} columns={columns} />;
};
