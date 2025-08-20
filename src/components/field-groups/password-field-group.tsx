import { withFieldGroup } from "~/components/app-form";

export const FieldGroupPasswordFields = withFieldGroup({
  defaultValues: {
    name: "",
    countryCode: "",
  },
  render: function Render({ group }) {
    return (
      <>
        <group.AppField
          name="name"
          children={(field) => <field.TextField label="Team name" />}
        />
        <group.AppField
          name="countryCode"
          children={(field) => (
            <field.TextField label="Country code" maxLength={2} />
          )}
        />
      </>
    );
  },
});
