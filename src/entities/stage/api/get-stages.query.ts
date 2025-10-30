import { queryOptions } from "@tanstack/react-query";
import { getAllStages } from "./get-stages.action";

export const STAGES_QUERY_KEY = ["STAGES-QUERY-KEY"];

export const stagesQueryOptions = queryOptions({
  queryKey: [STAGES_QUERY_KEY],
  queryFn: getAllStages,
});
