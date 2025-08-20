import { useAppForm } from "~/components/app-form";
import { useServerFn } from "@tanstack/react-start";
import { createTeam, editTeam } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import { TeamFormProps, TeamSchema } from "../types";
import { FieldGroupPasswordFields } from "~/components/field-groups/password-field-group";

export const EditTeamForm = ({ id, name, countryCode }: TeamFormProps) => {
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

  const {
    mutate: editTeamMutate,
    error: editTeamMutateError,
    isPending,
  } = useMutation({
    mutationFn: useServerFn(editTeam),
    onSuccess: () => {
      // TODO add toast
      router.invalidate();
      form.reset();
    },
  });

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        action={(formData) => {
          formData.append("id", id);
          editTeamMutate({
            data: formData,
          });
        }}
      >
        <div className="mb-5">
          <FieldGroupPasswordFields
            form={form}
            fields={{ name: "name", countryCode: "countryCode" }}
          />
        </div>
        <form.SubscribeButton>
          {isPending ? "Loading..." : "Edit team"}
        </form.SubscribeButton>
        {editTeamMutateError ? (
          <em className="text-red-500 text-xs block mt-2" role="alert">
            {editTeamMutateError.message}
          </em>
        ) : null}
      </form>
    </form.AppForm>
  );
};
