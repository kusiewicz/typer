import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAppForm } from "~/components/app-form";
import { Section } from "~/components/section";
import { fetchUser, signinFn } from "~/features/auth/actions";
import { SigninAuthSchema, signinFormOpts } from "~/features/auth/validators";
import { zodValidator } from "~/utils/zod/zod-validator-client";

export const Route = createFileRoute("/signin")({
  beforeLoad: async () => {
    const user = await fetchUser();

    if (user) {
      throw redirect({
        href: "/",
      });
    }
  },
  component: SignIn,
});

function SignIn() {
  const form = useAppForm({
    ...signinFormOpts,
    validators: {
      onChange: zodValidator(SigninAuthSchema),
    },
  });

  const { mutate: signInMutate, error: signInError } = useMutation({
    mutationFn: useServerFn(signinFn),
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Section title={<h1>Login</h1>}>
        <form
          className="max-w-sm mx-auto"
          action={(formData) => signInMutate({ data: formData })}
        >
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
            selector={(state) => [
              state.isSubmitting,
              state.canSubmit,
              state.isPristine,
            ]}
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
          {signInError ? (
            <em className="text-red-500 text-xs block mt-2" role="alert">
              {signInError.message}
            </em>
          ) : null}
        </form>
        <p className="mt-4 text-sm">
          Nie masz konta?{" "}
          <Link to={"/signup"} className="text-blue-300 hover:text-blue-400">
            Zarejestruj się
          </Link>
        </p>
      </Section>
    </div>
  );
}
