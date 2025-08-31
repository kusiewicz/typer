import { ReactNode } from "react";
import { useFormContext } from "../hooks/app-form";
import { SubmitButton as SubmitButtonBase } from "~/shared/ui/submit-button";

export const SubmitButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [
        state.canSubmit,
        state.isPristine,
        state.isSubmitting,
      ]}
    >
      {([canSubmit, isPristine, isSubmitting]) => (
        <SubmitButtonBase
          disabled={!canSubmit || isPristine}
          isLoading={isSubmitting}
          className={className}
        >
          {children}
        </SubmitButtonBase>
      )}
    </form.Subscribe>
  );
};
