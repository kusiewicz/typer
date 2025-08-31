import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  createTeam,
  editTeam,
  removeTeam,
} from "~/features/main/team-form/actions";
import { TeamFormProps, TeamSchema } from "~/features/main/team-form/types";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/utils/zod/zod-validator-client";

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

export const useEditTeam = ({ id, name, countryCode }: TeamFormProps) => {
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

export const useDeleteTeam = () => {
  return useMutation({
    mutationFn: useServerFn(removeTeam),
  });
};
