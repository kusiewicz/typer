import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "~/features/main/components/navbar";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: Layout,
});

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4">
        <Outlet />
      </div>
    </>
  );
}
