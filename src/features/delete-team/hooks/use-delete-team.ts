import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { deleteTeam } from "~/entities/team/api/delete-team.action";

export const useDeleteTeam = () => {
  return useMutation({
    mutationFn: useServerFn(deleteTeam),
  });
};
