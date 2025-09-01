import { useDeleteTeam } from "../hooks/use-delete-team";
import { useRouter } from "@tanstack/react-router";

interface DeleteTeamButtonProps {
  teamId: string;
  teamName: string;
  onSuccess?: () => void;
}

export const DeleteTeamButton = ({ teamId, teamName, onSuccess }: DeleteTeamButtonProps) => {
  const router = useRouter();
  const { mutate: deleteTeam, isPending, error } = useDeleteTeam();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete team "${teamName}"?`)) {
      deleteTeam(
        { data: { id: teamId } },
        {
          onSuccess: () => {
            router.invalidate();
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};
