import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAppForm } from "~/shared/hooks/app-form";
import { zodValidator } from "~/utils/zod/zod-validator-client";
import {
  SigninAuthSchema,
  signinFormOpts,
  SignupAuthSchema,
  signupFormOpts,
} from "~/features/auth/validators";
import { signin, signup } from "../api/sign-up.action";

export const useSignInForm = () => {
  const router = useRouter();
  const form = useAppForm({
    ...signinFormOpts,
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

export const useSignUpForm = () => {
  const router = useRouter();
  const form = useAppForm({
    ...signupFormOpts,
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
