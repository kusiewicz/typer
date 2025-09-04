import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { signin } from "../api/sign-in.action";
import { SigninAuthSchema } from "../types";

export const useSignInForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: zodValidator(SigninAuthSchema),
    },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(signin),
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(
      { data: formData },
      {
        onSuccess: () => {
          // TODO add toast (global in provider maybe)
          router.invalidate();
          form.reset();
        },
        onError: () => {
          console.log("error");
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
