import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchUser } from "~/entities/user/api/fetch-user.action";
import { SignUpPage } from "~/pages/sign-up.page";

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
