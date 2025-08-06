import { createFileRoute } from '@tanstack/react-router'


// TODO only admin should be able to do this
export const Route = createFileRoute('/_authed/add-team')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/add-team"!</div>
}
