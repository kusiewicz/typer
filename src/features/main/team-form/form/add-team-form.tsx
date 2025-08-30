import { useAppForm } from "~/shared/hooks/app-form";
import { useServerFn } from "@tanstack/react-start";
import { createTeam } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import { TeamSchema } from "../types";
import { FieldGroupPasswordFields } from "~/shared/ui/form-password-field-group";

export const AddTeamForm = () => {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      name: "",
      countryCode: "",
    },
    validators: {
      onChange: zodValidator(TeamSchema),
    },
  });

  const {
    mutate: addTeamMutate,
    error: addTeamMutateError,
    isPending,
  } = useMutation({
    mutationFn: useServerFn(createTeam),
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
        action={(formData) => addTeamMutate({ data: formData })}
      >
        <div className="mb-5">
          <FieldGroupPasswordFields
            form={form}
            fields={{ name: "name", countryCode: "countryCode" }}
          />
        </div>
        <form.SubscribeButton>
          {isPending ? "Loading..." : "Add team"}
        </form.SubscribeButton>
        {addTeamMutateError ? (
          <em className="text-red-500 text-xs block mt-2" role="alert">
            {addTeamMutateError.message}
          </em>
        ) : null}
      </form>
    </form.AppForm>
  );
};
