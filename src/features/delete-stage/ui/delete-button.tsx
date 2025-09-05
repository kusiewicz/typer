import { Trash2 } from "lucide-react";
import { useDeleteStage } from "../hooks/use-delete-stage";
import { StageFormProps } from "~/entities/stage/model/schema";

export const DeleteStageButton = ({
  stageId,
}: {
  stageId: StageFormProps["id"];
}) => {
  const { handleSubmit, isPending } = useDeleteStage();

  const handleDelete = () => {
    handleSubmit(stageId);
  };

  return (
    <button
      className="p-2 text-red-600 hover:text-red-800"
      title="Delete"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};
