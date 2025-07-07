import { mergeForm, useTransform } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useAppForm } from "~/components/form";
import { Section } from "~/components/section";
import { getFormDataFromServer, handleForm } from "~/utils/login-form";
import { formOpts } from "~/utils/login-form-opts";

const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Nazwa uzytkownika musi zawierać przynajmniej 5 znaków.")
    .max(20, "Nazwa uzytkownika musi zawierać mniej niz 20 znaków."),
  email: z.string().email("Nieprawidłowy adres email."),
  password: z.string().min(8, "Hasło musi zawierać przynajmniej 8 znaków."),
});

function zodValidator(schema: z.ZodSchema<any>) {
  return ({ value }: { value: any }) => {
    const result = schema.safeParse(value);
    if (result.success) {
      return undefined;
    }

    return {
      fields: result.error.errors.reduce(
        (acc, issue) => {
          const fieldName = issue.path[0];
          if (!fieldName) return acc;
          acc[fieldName] = issue.message;
          return acc;
        },
        {} as Record<string, string>
      ),
    };
  };
}

export const Route = createFileRoute("/login")({
  component: LoginComp,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

function LoginComp() {
  const { state } = Route.useLoaderData();

  const form = useAppForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    validators: {
      onSubmit: zodValidator(loginSchema),
    },
  });

  return (
    <Section title={<h1>Login</h1>}>
      <form
        className="max-w-sm mx-auto"
        action={handleForm.url}
        method="post"
        encType={"multipart/form-data"}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
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
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button
              type="submit"
              disabled={isSubmitting}
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
