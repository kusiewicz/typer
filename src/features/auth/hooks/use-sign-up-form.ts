import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/shared/lib/zod-validator-client";
import { signup } from "../api/sign-up.action";
import { SignupAuthSchema } from "../types";

// TODO Logika formularzy wyciagnieta w calosci do osobnych hookow 
// W conncetd bylo kilka miejsc z takimi samymi formularzami i trzeba bylo robic potworzenia
export const useSignUpForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    validators: {
      onChange: zodValidator(SignupAuthSchema),
    },
  });

  const mutation = useMutation({
    mutationFn: useServerFn(signup),
  });

  const handleSubmit = (formData: FormData) => {
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
