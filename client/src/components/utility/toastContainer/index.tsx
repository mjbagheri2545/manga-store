import { ToastContainer as Container } from "react-toastify";

import { XIcon } from "lucide-react";

import { Button } from "../Button";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

export function ToastContainer() {
  return (
    <Container
      position="top-center"
      theme="dark"
      closeButton={CloseButton}
      limit={4}
      newestOnTop
    />
  );
}

type CloseButtonProps = {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
};

function CloseButton({ closeToast }: CloseButtonProps) {
  return (
    <Button variant="icon" onClick={closeToast} className="my-auto">
      <XIcon />
    </Button>
  );
}

export default CloseButton;
