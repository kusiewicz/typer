import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchUser } from "~/entities/user/api/fetch-user.action";
import { SignInPage } from "~/pages/sign-in-up/sign-in.page";

export const Route = createFileRoute("/signin")({
  beforeLoad: async () => {
    const user = await fetchUser();

    if (user) {
      throw redirect({
        href: "/",
      });
    }
  },
  component: SignInPage,
});
