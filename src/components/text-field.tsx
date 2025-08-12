import { useFieldContext } from "./app-form";

export const TextField = ({
  label,
  inputType,
  maxLength,
}: {
  label: string;
  inputType?: string;
  maxLength?: number;
}) => {
  const field = useFieldContext<string>();

  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        id={field.name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        type={inputType}
        maxLength={maxLength}
      />
      {!field.state.meta.isValid && !field.state.meta.isPristine && (
        <em className="text-red-500 text-xs" role="alert">
          {field.state.meta.errors.join(", ")}
        </em>
      )}
    </>
  );
};
