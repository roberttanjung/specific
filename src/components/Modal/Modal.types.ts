import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  isDismissible?: boolean;
  size?: "sm" | "md" | "lg";
  footer?: ReactNode;
}
