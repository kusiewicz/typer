import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpPage } from "~/pages/sign-in/sign-up.page";
import { fetchUser } from "~/shared/api/fetch-user.action";

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    const user = await fetchUser();

    if (user) {
      throw redirect({
        href: "/",
      });
    }
  },
  component: SignUp,
});

function SignUp() {
  return <SignUpPage />;
}
