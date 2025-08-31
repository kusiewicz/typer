import { useSignUpForm } from "../hooks/use-auth-form";
import { ErrorField } from "~/shared/ui/form-error-field";

export const SignUpForm = () => {
  const { form, handleSubmit, error: signupError, isPending } = useSignUpForm();

  return (
    <form.AppForm>
      <form
        className="max-w-sm mx-auto"
        method="post"
        action={handleSubmit}
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

        <form.SubmitButton className="my-2">
          {" "}
          {isPending ? "Loading..." : "Submit"}
        </form.SubmitButton>

        {signupError ? <ErrorField>{signupError.message}</ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
