import { Spacer } from "~/shared/ui/spacer";
import { AddTeamForm } from "~/features/add-team/ui/add-team-form";
import { TeamsTable } from "~/widgets/teams-table/teams-table";

export const TeamsPage = () => (
  <>
    <AddTeamForm />
    <Spacer />
    <div className="shadow-lg sm:rounded-lg w-[80%]">
      <TeamsTable />
    </div>
  </>
);
