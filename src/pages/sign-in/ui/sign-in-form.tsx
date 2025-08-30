import { useAppForm } from "~/shared/hooks/app-form";
import { SigninAuthSchema, signinFormOpts } from "~/features/auth/validators";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import { useAuthForm } from "../hooks/use-auth-form";
import { ErrorField } from "~/shared/ui/form-error-field";

export const SignInForm = () => {
  const form = useAppForm({
    ...signinFormOpts,
    validators: {
      onChange: zodValidator(SigninAuthSchema),
    },
  });

  const { mutate: signInMutate, error: signInError } = useAuthForm("signIn");

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        action={(formData) => signInMutate({ data: formData })}
      >
        <form.FieldsContainer>
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Email" />}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField label="Password" inputType="password" />
            )}
          />
        </form.FieldsContainer>

        <form.SubmitButton className="my-2" />

        {signInError ? <ErrorField>{signInError.message}</ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
