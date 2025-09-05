import { StageFormProps } from "~/entities/stage/model/schema";
import { useEditStageForm } from "../hooks/use-edit-stage-form";

export const EditStageForm = ({ id, name, multiplier }: StageFormProps) => {
  const { form, handleSubmit, error, isPending } = useEditStageForm({
    id,
    name,
    multiplier,
  });

  return (
    <form.AppForm>
      <form className="max-w-sm mx-auto" action={handleSubmit}>
        <form.FieldsContainer>
          <form.AppField name="name">
            {(field) => <field.TextField label="Stage name" />}
          </form.AppField>

          <form.AppField name="multiplier">
            {(field) => (
              <field.TextField label="Multiplier" inputType="number" />
            )}
          </form.AppField>
        </form.FieldsContainer>

        <form.SubmitButton>
          {isPending ? "Loading..." : "Edit stage"}
        </form.SubmitButton>

        {error ? <form.ErrorField>{error.message}</form.ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
