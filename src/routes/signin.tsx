import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInPage } from "~/pages/sign-in.page";
import { fetchUser } from "~/features/auth/lib/auth.guard";

export const Route = createFileRoute("/signin")({
  beforeLoad: async () => {
    const user = await fetchUser();

    if (user) {
      throw redirect({
        href: "/",
      });
    }
  },
  component: SignIn,
});

function SignIn() {
  return <SignInPage />;
}
