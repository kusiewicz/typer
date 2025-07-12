import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/confirm-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Sprawdź skrzynkę pocztową i potwierdź swój email</div>
}
