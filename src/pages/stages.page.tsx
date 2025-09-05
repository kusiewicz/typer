import { Spacer } from "~/shared/ui/spacer";
import { AddStageForm } from "~/features/add-stage/ui/add-stage-form";
import { StagesTable } from "~/widgets/stages-table/stages-table";

export const StagesPage = () => (
  <>
    <AddStageForm />
    <Spacer />
    <div className="shadow-lg sm:rounded-lg w-[80%]">
      <StagesTable />
    </div>
  </>
);
