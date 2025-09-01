import { createFileRoute } from "@tanstack/react-router";
import { ConfirmEmailPage } from "~/pages/confirm-email.page";

export const Route = createFileRoute("/confirm-email")({
  component: ConfirmEmail,
});

function ConfirmEmail() {
  return <ConfirmEmailPage />;
}
