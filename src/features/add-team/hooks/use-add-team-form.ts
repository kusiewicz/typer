import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { TeamSchema } from "~/entities/team/model/schema";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createTeam } from "~/entities/team/api/create-team.action";

export const useAddTeamForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { name: "", countryCode: "" },
    validators: { onChange: zodValidator(TeamSchema) },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(createTeam),
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(
      { data: formData },
      {
        onSuccess: () => {
          router.invalidate();
          form.reset();
        },
      }
    );
  };

  return {
    form,
    handleSubmit,
    error: mutation.error,
    isPending: mutation.isPending,
  };
};
