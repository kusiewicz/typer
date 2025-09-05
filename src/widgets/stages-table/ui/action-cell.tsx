import { CellContext } from "@tanstack/react-table";
import { StageFormProps } from "~/entities/stage/model/schema";
import { DeleteStageButton } from "~/features/delete-stage/ui/delete-button";
import { EditStageButton } from "~/features/edit-stage/ui/edit-stage-button";

export const ActionCell = ({
  cellInfo,
}: {
  cellInfo: CellContext<StageFormProps, unknown>;
}) => {
  const stage = cellInfo.row.original;

  return (
    <div className="flex gap-2 justify-center">
      <EditStageButton stage={stage} />
      <DeleteStageButton stageId={stage.id} />
    </div>
  );
};
