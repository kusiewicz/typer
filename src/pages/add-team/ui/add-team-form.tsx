import { FieldGroupPasswordFields } from "~/shared/ui/form-password-field-group";
import { useAddTeamForm } from "~/pages/add-team/hooks/use-team-form";

export const AddTeamForm = () => {
  const { form, handleSubmit, error, isPending } = useAddTeamForm();

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        action={(formData) => handleSubmit(formData)}
      >
        <div className="mb-5">
          <FieldGroupPasswordFields
            form={form}
            fields={{ name: "name", countryCode: "countryCode" }}
          />
        </div>
        <form.SubmitButton>
          {isPending ? "Loading..." : "Add team"}
        </form.SubmitButton>

        {error ? <form.ErrorField>{error.message}</form.ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
