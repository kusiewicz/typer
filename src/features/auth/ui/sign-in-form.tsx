import { useSignInForm } from "../hooks/use-sign-in-form";

export const SignInForm = () => {
  const { form, handleSubmit, error, isPending } = useSignInForm();

  return (
    <form.AppForm>
      <form className="max-w-sm mx-auto" action={handleSubmit}>
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

        <form.SubmitButton className="my-2">
          {isPending ? "Loading..." : "Submit"}
        </form.SubmitButton>

        {error ? <form.ErrorField>{error.message}</form.ErrorField> : null}
      </form>
    </form.AppForm>
  );
};
