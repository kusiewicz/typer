import { queryOptions } from "@tanstack/react-query";
import { getAllTeams } from "./get-teams.action";

export const TEAMS_QUERY_KEY = ["TEAMS-QUERY-KEY"];

export const teamsQueryOptions = queryOptions({
  queryKey: [TEAMS_QUERY_KEY],
  queryFn: getAllTeams,
});
