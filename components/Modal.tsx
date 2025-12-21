"use client";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute overlay inset-0" onClick={onClose} />

      <div className="relative rounded-[3rem] bg-white p-8 mx-4">
        {children}
      </div>
    </div>,
    modalRoot
  );
};
