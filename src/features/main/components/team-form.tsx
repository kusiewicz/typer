import { useAppForm } from "~/components/app-form";
import { TeamOpts, TeamSchema } from "../validators";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import { useServerFn } from "@tanstack/react-start";
import { createTeam } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const TeamForm = () => {
  const router = useRouter();

  const form = useAppForm({
    ...TeamOpts,
    validators: {
      onChange: zodValidator(TeamSchema),
    },
  });

  const { mutate: addTeamMutate, error: addTeamMutateError } = useMutation({
    mutationFn: useServerFn(createTeam),
    onSuccess: () => {
      alert("Dodano");
      router.invalidate();
    },
  });

  return (
    <form
      className="max-w-sm mx-auto"
      action={(formData) => addTeamMutate({ data: formData })}
    >
      <div className="mb-5">
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Team name" />}
        />
        <form.AppField
          name="countryCode"
          children={(field) => <field.TextField label="Country code" />}
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
      {addTeamMutateError ? (
        <em className="text-red-500 text-xs block mt-2" role="alert">
          {addTeamMutateError.message}
        </em>
      ) : null}
    </form>
  );
};
