import { z } from "zod/v4";

export type TeamFormProps = z.infer<typeof TeamSchema> & {
  id: string;
};

export const TeamSchema = z.object({
  name: z.string().min(3, "Team name should contain at least 3 characters."),
  countryCode: z.string().length(2, "Country code should contain 2 letters."),
});

export type RemoveTeamProps = z.infer<typeof RemoveTeamSchema>;

export const RemoveTeamSchema = z.object({
  id: z.uuid("Invalid team ID format."),
});

export type EditTeamProps = z.infer<typeof EditTeamSchema>;

export const EditTeamSchema = z.object({
  id: z.uuid("Invalid team ID format."),
  name: z.string().min(3, "Team name should contain at least 3 characters."),
  countryCode: z.string().length(2, "Country code should contain 2 letters."),
});
