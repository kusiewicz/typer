import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { getSupabaseBrowserClient } from "~/utils/supabase/client";

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
  const supabase = getSupabaseBrowserClient();
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-black text-xl">
          {user?.email && `Hello ${user.email}`}
        </h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut().then(() => {
              navigate({
                to: "/",
              });
            });
          }}
          className="cursor-pointer"
        >
          Wyloguj sie
        </button>
      </header>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}
