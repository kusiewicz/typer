import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { getSupabaseBrowserClient } from "~/utils/supabase/client";

export const Route = createFileRoute("/_authed/")({
  component: Home,
});

function Home() {
  const supabase = getSupabaseBrowserClient();
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
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
    </div>
  );
}
