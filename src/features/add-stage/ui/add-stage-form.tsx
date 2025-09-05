import { useAddStageForm } from "../hooks/use-add-stage-form";

export const AddStageForm = () => {
  const { form, handleSubmit, error, isPending } = useAddStageForm();

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        action={(formData) => handleSubmit(formData)}
      >
        <div className="mb-5">
          <form.AppField name="name">
            {(field) => <field.TextField label="Stage name" />}
          </form.AppField>

          <form.AppField name="multiplier">
            {(field) => (
              <field.TextField label="Multiplier" inputType="number" />
            )}
          </form.AppField>
        </div>
        <form.SubmitButton>
          {isPending ? "Loading..." : "Add stage"}
        </form.SubmitButton>

        {error ? <form.ErrorField>{error.message}</form.ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
