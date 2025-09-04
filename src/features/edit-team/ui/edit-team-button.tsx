import { Edit } from "lucide-react";
import { Modal } from "~/shared/ui/modal";
import { useModal } from "~/shared/hooks/use-modal";
import { ModalBody, ModalHeader } from "flowbite-react";
import { EditTeamForm } from "./edit-team-form";
import { TeamFormProps } from "~/entities/team/model/schema";

export const EditTeamButton = ({ team }: { team: TeamFormProps }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button
        className="p-2 text-blue-600 hover:text-blue-800"
        title="Edit"
        onClick={openModal}
      >
        <Edit className="w-5 h-5" />
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ModalHeader>Edit team</ModalHeader>
        <ModalBody>
          <EditTeamForm
            id={team.id}
            name={team.name}
            countryCode={team.countryCode}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
