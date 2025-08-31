import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "../ui/form-subscribed-text-field";
import { SubmitButton } from "../ui/form-subscribed-submit-button";
import { FieldsContainer } from "../ui/form-fields-container";
import { ErrorField } from "../ui/form-error-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: { TextField },
  formComponents: { SubmitButton, FieldsContainer, ErrorField },
  fieldContext,
  formContext,
});
