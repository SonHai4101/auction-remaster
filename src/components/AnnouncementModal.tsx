import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { CustomModal } from "./CustomModal";
import { Card } from "./retroui/Card";
import { Button } from "./retroui/Button";

interface AnnouncementModalProps {
  description: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string | React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
  size?: "auto" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "screen";
}

export const AnnouncementModal = NiceModal.create<AnnouncementModalProps>(
  ({
    description,
    title,
    icon,
    cancelButtonText,
    confirmButtonText,
    onConfirm,
    onCancel,
    hideCancelButton,
    size = "auto",
  }) => {
    const modal = useModal();
    return (
      <CustomModal
        open={modal.visible}
        hide={modal.hide}
        show={modal.show}
        showHeader={false}
        showFooter={false}
        size={size}
        showCancelButton={true}
      >
        <Card className="w-full shadow-none hover:shadow-md">
          <Card.Header className="text-start bg-amber-300">
            <Card.Title className="mb-0">{title}</Card.Title>
          </Card.Header>
          <Card.Content>
            {icon}
            <div className="text-lg pb-5 text-gray-500 dark:text-gray-400">
              {description}
            </div>
            <div className="flex gap-2 justify-end">

            <Button onClick={onConfirm}>{confirmButtonText}</Button>
            {!hideCancelButton && (
              <Button variant="secondary" onClick={onCancel}>
                {cancelButtonText}
              </Button>
            )}
            </div>
          </Card.Content>
        </Card>
      </CustomModal>
    );
  }
);
