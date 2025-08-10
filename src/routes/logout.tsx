import { createFileRoute } from "@tanstack/react-router";
import { logout } from "~/features/auth/actions";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: () => logout(),
});
