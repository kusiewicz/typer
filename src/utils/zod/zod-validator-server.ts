import { z } from "zod/v4";

export const zodValidator = (schema: z.ZodSchema<any>) => {
  return (data: FormData) => {
    const result = schema.safeParse(Object.fromEntries(data.entries()));
    if (result.success) {
      return data;
    }

    // todo make server validataion better
    throw new Error("Server error");
  };
};
