import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { TeamFormProps, TeamSchema } from "~/entities/team/model/schema";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { editTeam } from "~/entities/team/api/edit-team.action";

export const useEditTeamForm = ({ id, name, countryCode }: TeamFormProps) => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      name,
      countryCode,
    },
    validators: {
      onChange: zodValidator(TeamSchema),
    },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(editTeam),
  });

  const handleSubmit = (formData: FormData) => {
    formData.append("id", id);
    mutation.mutate(
      { data: formData },
      {
        onSuccess: () => {
          // TODO add toast
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
