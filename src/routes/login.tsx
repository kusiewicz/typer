import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "~/components/form";
import { Section } from "~/components/section";
import { signupFn } from "~/utils/login-form";
import { formOpts, loginSchema } from "~/utils/login-form-opts";
import { zodValidator } from "~/utils/zod-validator-client";

export const Route = createFileRoute("/login")({
  component: LoginComp,
});

function LoginComp() {
  const form = useAppForm({
    ...formOpts,
    validators: {
      onChange: zodValidator(loginSchema),
    },
  });

  return (
    <Section title={<h1>Login</h1>}>
      <form className="max-w-sm mx-auto" method="post" action={signupFn.url}>
        <div className="mb-5">
          <form.AppField
            name="username"
            children={(field) => <field.TextField label="Full name" />}
          />
        </div>
        <div className="mb-5">
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Email" />}
          />
        </div>
        <div className="mb-5">
          <form.AppField
            name="password"
            children={(field) => <field.TextField label="Password" />}
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
