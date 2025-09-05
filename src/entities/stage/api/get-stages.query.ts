import { queryOptions } from "@tanstack/react-query";
import { getAllStages } from "./get-stages.action";

export const stagesQueryOptions = queryOptions({
  queryKey: ["stages"],
  queryFn: getAllStages,
});
