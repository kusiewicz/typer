import { formOptions } from "@tanstack/react-form";
import { z } from "zod/v4";

// Team
export type TeamForm = z.infer<typeof TeamFormSchema>;

export const TeamFormOpts = formOptions({
  defaultValues: {
    name: "",
  },
});

export const TeamFormSchema = z.object({
  name: z.string().min(3, "Team name is required"),
});
