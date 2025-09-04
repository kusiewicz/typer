import { CellContext } from "@tanstack/react-table";
import { TeamFormProps } from "~/entities/team/model/schema";
import { DeleteTeamButton } from "~/features/delete-team/ui/delete-button";
import { EditTeamButton } from "~/features/edit-team/ui/edit-team-button";

export const ActionCell = ({
  cellInfo,
}: {
  cellInfo: CellContext<TeamFormProps, unknown>;
}) => {
  const team = cellInfo.row.original;

  return (
    <div className="flex gap-2 justify-center">
      <EditTeamButton team={team} />
      <DeleteTeamButton teamId={team.id} />
    </div>
  );
};
