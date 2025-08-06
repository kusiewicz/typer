import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getSupabaseBrowserClient } from "~/utils/supabase/client";

export const Route = createFileRoute("/_authed/")({
  component: Home,
});

function Home() {
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
        >
          Wyloguj sie
        </button>
      </header>
      <div className="flex flex-col items-center justify-center">
        <h1>Home</h1>
      </div>
    </>
  );
}
