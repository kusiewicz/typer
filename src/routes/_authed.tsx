import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MainLayout } from "~/layouts/main.layout";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: MainLayout,
});
