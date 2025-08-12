import { formOptions, useStore } from "@tanstack/react-form";
import { z } from "zod/v4";
import { withFieldGroup } from "~/components/app-form";
import { zodValidator } from "~/utils/zod/zod-validator-client";

export type TeamFormProps = z.infer<typeof TeamSchema> & {
  id: string;
};
export type RemoveTeamProps = z.infer<typeof RemoveTeamSchema>;

export const TeamSchema = z.object({
  name: z.string().min(3, "Team name should contain at least 3 characters."),
  countryCode: z.string().length(2, "Country code should contain 2 letters."),
});

export const RemoveTeamSchema = z.object({
  id: z.uuid("Invalid team ID format."),
});

const defaultValues = {
  name: "",
  countryCode: "",
};

export const TeamOpts = formOptions({
  defaultValues,
  validators: {
    onChange: zodValidator(TeamSchema),
  },
});

export const FieldGroupPasswordFields = withFieldGroup({
  defaultValues,
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
