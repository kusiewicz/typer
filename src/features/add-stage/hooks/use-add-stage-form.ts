import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { StageSchema } from "~/entities/stage/model/schema";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createStage } from "~/entities/stage/api/create-stage.action";

export const useAddStageForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { name: "", multiplier: "1.0" },
    validators: { onChange: zodValidator(StageSchema) },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(createStage),
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(
      { data: formData },
      {
        onSuccess: () => {
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