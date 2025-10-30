import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { deleteTeam } from "~/entities/team/api/delete-team.action";

export const useDeleteTeam = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: useServerFn(deleteTeam),
    onSuccess: () => {
      router.invalidate();
      // zinvalidduj query
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (id: string) => {
    mutation.mutate({ data: { id } });
  };

  return { handleSubmit, isPending: mutation.isPending };
};
