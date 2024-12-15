import React from "react";

import { X } from "lucide-react";

import Button from "../Button";

type CloseButtonProps = {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
};

function CloseButton({ closeToast }: CloseButtonProps) {
  return (
    <Button variant="icon" onClick={closeToast} className="my-auto">
      <X />
    </Button>
  );
}

export default CloseButton;
