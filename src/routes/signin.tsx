import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "~/components/form";
import { Section } from "~/components/section";
import { formOpts, AuthSchema } from "~/utils/auth-form-opts";
import { zodValidator } from "~/utils/zod-validator-client";
import { signinFn } from "~/utils/signin-form";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  const form = useAppForm({
    ...formOpts,
    validators: {
      onChange: zodValidator(AuthSchema),
    },
  });

  return (
    <Section title={<h1>Login</h1>}>
      <form className="max-w-sm mx-auto" method="post" action={signinFn.url}>
        <div className="mb-5">
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Email" />}
          />
        </div>
        <div className="mb-5">
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField label="Hasło" inputType="password" />
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => {
            return [state.isSubmitting, state.canSubmit, state.isPristine];
          }}
        >
          {([isSubmitting, canSubmit, isPristine]) => (
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit || isPristine}
              className="text-white bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSubmitting ? "loading" : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </Section>
  );
}
