import { TeamFormProps } from "../../../features/main/team-form/types";
import { FieldGroupPasswordFields } from "~/shared/ui/form-password-field-group";
import { useEditTeam } from "~/pages/add-team/hooks/use-team-form";

export const EditTeamForm = ({ id, name, countryCode }: TeamFormProps) => {
  const { form, handleSubmit, error, isPending } = useEditTeam({
    id,
    name,
    countryCode,
  });

  return (
    <form.AppForm>
      <form className="max-w-sm mx-auto" action={handleSubmit}>
        <form.FieldsContainer>
          <FieldGroupPasswordFields
            form={form}
            fields={{ name: "name", countryCode: "countryCode" }}
          />
        </form.FieldsContainer>

        <form.SubmitButton>
          {isPending ? "Loading..." : "Edit team"}
        </form.SubmitButton>

        {error ? <form.ErrorField>{error.message}</form.ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
