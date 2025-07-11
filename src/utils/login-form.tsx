import { createServerFn } from "@tanstack/react-start";
import { getFormData } from "@tanstack/react-form/start";
import { loginSchema } from "./login-form-opts";
import { zodValidator } from "./zod-validator-server";

export const signupFn = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    return zodValidator(loginSchema)(data);
  })
  .handler(async (ctx: unknown) => {
    console.log(ctx);
  });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  }
);
