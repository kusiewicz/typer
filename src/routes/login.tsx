import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
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

  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    validators: {
      onChange: zodValidator(loginSchema),
    },
    // validators: {
    //   onChange: ({ value }) => {
    //     return {
    //       fields: {
    //         username:
    //           value.username.length < 5
    //             ? "Username should be bla bla "
    //             : undefined,
    //       },
    //     };
    //   },
    // },
  });

  return (
    <Section title={<h1>Login</h1>}>
      <form
        className="max-w-sm mx-auto"
        action={handleForm.url}
        method="post"
        encType={"multipart/form-data"} // potrzebne?
      >
        <div className="mb-5">
          <form.Field
            name="username"
            validators={
              {
                // onChangeAsyncDebounceMs: 500,
                // onChangeAsync: async ({ value }) => {
                //   await new Promise((resolve) => setTimeout(resolve, 1000));
                //   return (
                //     value.includes("error") && 'No "error" allowed in first name'
                //   );
                // },
              }
            }
            children={(field) => {
              return (
                <>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor={field.name}
                  >
                    First Name:
                  </label>
                  <input
                    id={field.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <form.Field
            name="email"
            validators={
              {
                // onChangeAsyncDebounceMs: 500,
                // onChangeAsync: async ({ value }) => {
                //   await new Promise((resolve) => setTimeout(resolve, 1000));
                //   return value.includes("error") && 'No "error" allowed in email';
                // },
              }
            }
            children={(field) => {
              return (
                <>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor={field.name}
                  >
                    Email:
                  </label>
                  <input
                    id={field.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <form.Field
            name="password"
            validators={
              {
                // onChangeAsyncDebounceMs: 500,
                // onChangeAsync: async ({ value }) => {
                //   await new Promise((resolve) => setTimeout(resolve, 1000));
                //   return (
                //     value.includes("error") && 'No "error" allowed in password'
                //   );
                // },
              }
            }
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hasło
                  </label>
                  <input
                    type="password"
                    id={field.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
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
