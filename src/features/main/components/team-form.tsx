import { z } from "zod/v4";
import { useAppForm } from "~/components/app-form";
import { TeamFormOpts, TeamFormSchema } from "./validators";
import { zodValidator } from "~/utils/zod/zod-validator-client";

export const TeamForm = () => {
  const form = useAppForm({
    ...TeamFormOpts,
    validators: {
      onChange: zodValidator(TeamFormSchema),
    },
  });

  return (
    <form className="max-w-sm mx-auto">
      <div className="mb-5">
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Team name" />}
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
            {isSubmitting ? "Loading..." : "Add team"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
};
