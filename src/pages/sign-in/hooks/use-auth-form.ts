import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { signin, signup } from "../api/sign-up.action";

export const useAuthForm = (action: "signUp" | "signIn") => {
  const { mutate: signInMutate, error: signInError } = useMutation({
    mutationFn: useServerFn(signin),
  });

  const { mutate: signUpMutate, error: signUpError } = useMutation({
    mutationFn: useServerFn(signup),
  });

  return {
    mutate: action === "signIn" ? signInMutate : signUpMutate,
    error: action === "signIn" ? signInError : signUpError,
  };
};
