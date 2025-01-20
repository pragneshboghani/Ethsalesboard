// Modal.js
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const sizeClasses = {
  small: "max-w-[404px]",
  medium: "max-w-[526px]",
  large: "max-w-3xl",
};

export const Modal = ({
  size = "medium",
  isOpen,
  onClose,
  title,
  description,
  children,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className={`p-[30px] ${sizeClasses[size]}`}>
      <DialogHeader>
        <DialogTitle className="text-shades-black text-title-4  font-bagoss">
          {title}
        </DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);
