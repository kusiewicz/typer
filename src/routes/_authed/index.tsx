import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/")({
  component: Home,
});

function Home() {
  return (
    <>
      <h1>Hej</h1>
    </>
  );
}
