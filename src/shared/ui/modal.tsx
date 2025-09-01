import { Modal as ModalBase, ModalBody, ModalHeader } from "flowbite-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  backdropClick?: boolean;
}

export const Modal = ({
  isOpen,
  closeModal,
  children,
  backdropClick = true,
}: ModalProps) => {
  return (
    <ModalBase
      show={isOpen}
      onClose={() => closeModal()}
      dismissible={backdropClick}
    >
      {children}
    </ModalBase>
  );
};
