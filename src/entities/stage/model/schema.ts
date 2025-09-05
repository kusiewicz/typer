import { z } from "zod/v4";

export type StageFormProps = z.infer<typeof StageSchema> & {
  id: string;
};

export const StageSchema = z.object({
  name: z.string().min(2, "Stage name should contain at least 2 characters"),
  multiplier: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Multiplier must be a valid number")
    .refine((val) => val >= 0.1, "Multiplier must be at least 0.1")
    .refine((val) => val <= 10.0, "Multiplier must be at most 10.0")
    .refine((val) => {
      const str = val.toString();
      const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
      return decimalPlaces <= 2;
    }, "Multiplier must have at most 2 decimal places"),
});

export type RemoveStageProps = z.infer<typeof RemoveStageSchema>;

export const RemoveStageSchema = z.object({
  id: z.uuid("Invalid schema ID format."),
});

export type EditStageProps = z.infer<typeof EditStageSchema>;

export const EditStageSchema = z.object({
  id: z.uuid("Invalid schema ID format."),
  name: z.string().min(2, "Stage name should contain at least 2 characters"),
  multiplier: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Multiplier must be a valid number")
    .refine((val) => val >= 0.1, "Multiplier must be at least 0.1")
    .refine((val) => val <= 10.0, "Multiplier must be at most 10.0")
    .refine((val) => {
      const str = val.toString();
      const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
      return decimalPlaces <= 2;
    }, "Multiplier must have at most 2 decimal places"),
});
