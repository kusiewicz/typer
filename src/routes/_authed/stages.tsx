import { createFileRoute } from "@tanstack/react-router";
import { stagesQueryOptions } from "~/entities/stage/api/get-stages.query";
import { StagesPage } from "~/pages/stages.page";

export const Route = createFileRoute("/_authed/stages")({
  component: StagesPage,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(stagesQueryOptions);
  },
});
