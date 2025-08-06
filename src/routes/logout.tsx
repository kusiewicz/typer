import { createFileRoute } from "@tanstack/react-router";
import { logoutFn } from "~/features/auth/actions";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: () => logoutFn(),
});
