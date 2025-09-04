import { queryOptions } from "@tanstack/react-query";
import { getAllTeams } from "./get-teams.action";

export const teamsQueryOptions = queryOptions({
  queryKey: ["teams"],
  queryFn: getAllTeams,
});
