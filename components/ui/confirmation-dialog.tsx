"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! overlay">
      {/* Backdrop */}
      <div className="absolute! inset-0! bg-transparent!" onClick={onClose} />

      {/* Dialog */}
      <div className="relative! bg-white! rounded-[1.2rem]! shadow-2xl! p-[2.4rem]! max-w-2xl! w-full! mx-[1.6rem]! border! border-[#E2E4E9]!">
        <h3 className="text-[2rem]! font-semibold! text-[#1F242E]! mb-[1.2rem]! leading-[2.4rem]!">
          {title}
        </h3>
        {description && (
          <p className="text-[#676F7E]! text-[1.6rem]! leading-[2.4rem]! mb-[2.4rem]! whitespace-normal! wrap-break-word! word-wrap! overflow-wrap-anywhere!">
            {description}
          </p>
        )}

        <div className="flex! gap-[1.2rem]! justify-end!">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-[2.4rem]! py-[1.2rem]! bg-white text-[1.6rem]! border-[#E2E4E9]! hover:bg-[#F8F9FA]! rounded-[0.8rem]! font-medium!"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`px-[2.4rem]! py-[1.2rem]! text-[1.6rem]! rounded-[0.8rem]! font-medium! ${
              variant === "destructive"
                ? "bg-[#DC2626]! hover:bg-[#B91C1C]! text-white! border-[#DC2626]!"
                : "bg-[#03624C]! hover:bg-[#025A43]! text-white! border-[#03624C]!"
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    description?: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
  } | null>(null);

  const confirm = (options: {
    title: string;
    description?: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
  }) => {
    setConfig(options);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const dialog = config ? (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={close}
      onConfirm={config.onConfirm}
      title={config.title}
      description={config.description}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
      variant={config.variant}
    />
  ) : null;

  return { confirm, dialog };
}
