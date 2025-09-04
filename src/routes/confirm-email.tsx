import { createFileRoute } from "@tanstack/react-router";
import { ConfirmEmailPage } from "~/pages/confirm-email/confirm-email.page";

export const Route = createFileRoute("/confirm-email")({
  component: ConfirmEmailPage,
});
