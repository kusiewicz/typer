import { useState } from "react";

export const useModal = (open = false) => {
  const [isOpen, setIsOpen] = useState(open);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return { isOpen, openModal, closeModal };
};
