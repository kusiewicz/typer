import { Trash2 } from "lucide-react";
import { useDeleteTeam } from "../hooks/use-delete-team";
import { TeamFormProps } from "~/entities/team/model/schema";

export const DeleteTeamButton = ({
  teamId,
}: {
  teamId: TeamFormProps["id"];
}) => {
  const { handleSubmit, isPending } = useDeleteTeam();

  const handleDelete = () => {
    handleSubmit(teamId);
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
