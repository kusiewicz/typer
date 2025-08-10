import { formOptions } from "@tanstack/react-form";
import { z } from "zod/v4";

// Team
export type TeamFormProps = z.infer<typeof TeamSchema>;

export const TeamOpts = formOptions({
  defaultValues: {
    name: "",
    countryCode: "",
  },
});

export const TeamSchema = z.object({
  name: z.string().min(3, "Team name is required."),
  countryCode: z.string().length(2, "Country code should contain 2 letters."),
});
