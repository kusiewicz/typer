import { z } from "zod/v4";

export const zodValidator = (schema: z.ZodSchema<any>) => {
  return ({ value }: { value: any }) => {
    const result = schema.safeParse(value);
    if (result.success) {
      return undefined;
    }

    const flattenError = z.flattenError(result.error);

    return {
      fields: Object.fromEntries(
        Object.entries(flattenError.fieldErrors).map(([key, value]) => [
          key,
          value!.join(", "),
        ])
      ),
    };
  };
};
