import { useAppForm } from "~/shared/hooks/app-form";
import { SignupAuthSchema, signupFormOpts } from "~/features/auth/validators";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import { useAuthForm } from "../hooks/use-auth-form";
import { Spacer } from "~/shared/ui/spacer";
import { ErrorField } from "~/shared/ui/form-error-field";

export const SignUpForm = () => {
  const form = useAppForm({
    ...signupFormOpts,
    validators: {
      onChange: zodValidator(SignupAuthSchema),
    },
  });

  const { mutate: signupMutation, error: signupError } = useAuthForm("signUp");

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        method="post"
        action={(formData) => signupMutation({ data: formData })}
      >
        <form.FieldsContainer>
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Email" />}
          />
          <form.AppField
            name="username"
            children={(field) => <field.TextField label="Username" />}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField label="Password" inputType="password" />
            )}
          />
        </form.FieldsContainer>

        <form.SubmitButton className="my-2" />

        {signupError ? <ErrorField>{signupError.message}</ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
