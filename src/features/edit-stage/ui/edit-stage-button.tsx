import { Edit } from "lucide-react";
import { Modal } from "~/shared/ui/modal";
import { useModal } from "~/shared/hooks/use-modal";
import { ModalBody, ModalHeader } from "flowbite-react";
import { EditStageForm } from "./edit-stage-form";
import { StageFormProps } from "~/entities/stage/model/schema";

export const EditStageButton = ({ stage }: { stage: StageFormProps }) => {
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
        <ModalHeader>Edit stage</ModalHeader>
        <ModalBody>
          <EditStageForm
            id={stage.id}
            name={stage.name}
            multiplier={stage.multiplier}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
