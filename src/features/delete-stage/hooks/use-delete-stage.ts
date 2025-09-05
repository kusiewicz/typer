import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { deleteStage } from "~/entities/stage/api/delete-stage.action";

export const useDeleteStage = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: useServerFn(deleteStage),
    onSuccess: () => {
      router.invalidate();
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
