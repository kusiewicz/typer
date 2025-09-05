import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { StageFormProps, StageSchema } from "~/entities/stage/model/schema";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { editStage } from "~/entities/stage/api/edit-stage.action";

export const useEditStageForm = ({ id, name, multiplier }: StageFormProps) => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      name,
      multiplier: multiplier.toString(),
    },
    validators: {
      onChange: zodValidator(StageSchema),
    },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(editStage),
  });

  const handleSubmit = (formData: FormData) => {
    formData.append("id", id);
    mutation.mutate(
      { data: formData },
      {
        onSuccess: () => {
          // TODO add toast
          router.invalidate();
          form.reset();
        },
      }
    );
  };

  return {
    form,
    handleSubmit,
    error: mutation.error,
    isPending: mutation.isPending,
  };
};
