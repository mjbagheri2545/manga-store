import { PropsWithChildren } from "react";

import { XCircleIcon } from "lucide-react";

import {
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "@/components/utility/modal";

type ErrorModalProps = PropsWithChildren & {
  text: string;
};

function ErrorModal({ children, text }: ErrorModalProps) {
  return (
    <Modal>
      <ModalContent className="text-alert-colorError bg-alert-bgError">
        <ModalHeader
          Icon={XCircleIcon}
          iconProps={{ className: "text-error" }}
          containerProps={{ className: "flex flex-col items-center" }}
        />
        <p>{text}</p>
        <ModalActions>{children}</ModalActions>
      </ModalContent>
    </Modal>
  );
}

export default ErrorModal;
