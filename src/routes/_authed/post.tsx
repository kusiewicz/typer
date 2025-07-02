import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/post"!</div>
}
