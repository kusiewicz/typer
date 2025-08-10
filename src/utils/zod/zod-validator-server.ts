import { z } from "zod/v4";

export const zodValidator = <T extends z.ZodSchema>(schema: T) => {
  return (formData: FormData): z.infer<T> => {
    const dataObject = Object.fromEntries(formData.entries());
    const result = schema.safeParse(dataObject);

    if (result.success) {
      return result.data;
    }

    // TODO: Zwróć lepszy błąd, np. z informacjami o błędach walidacji
    // console.error(result.error.flatten());
    throw new Error("Server error: Invalid payload");
  };
};
