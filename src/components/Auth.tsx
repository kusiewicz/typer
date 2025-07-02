import { Section } from "./section";
import { AnyFieldApi, formOptions, useForm } from "@tanstack/react-form";
import {
  createServerValidate,
  getFormData,
  ServerValidateError,
} from "@tanstack/react-form/start";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: "pending" | "idle" | "success" | "error";
  afterSubmit?: React.ReactNode;
}) {
  const formOpts = formOptions({
    defaultValues: defaultUser,
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Section title={<h1>Login</h1>}>
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="mb-5">
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A first name is required"
                  : value.length < 3
                    ? "First name must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
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
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "An email is required"
                  : !/\S+@\S+\.\S+/.test(value)
                    ? "Email is invalid"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return value.includes("error") && 'No "error" allowed in email';
              },
            }}
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
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value ? "A password is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in password'
                );
              },
            }}
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
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Section>
  );
}
