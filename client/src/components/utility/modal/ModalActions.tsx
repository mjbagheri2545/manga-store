import React from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import { Button, ButtonProps } from "../Button";

type ModalActionsProps = PropsWithContainer &
  ({ children: React.ReactNode } | { closeButtonProps?: ButtonProps });

export function ModalActions({
  containerProps,
  ...restProps
}: ModalActionsProps) {
  return (
    <div
      {...containerProps}
      className={twMerge("modal-action mt-8 gap-4", containerProps?.className)}
    >
      {"children" in restProps ? (
        restProps.children
      ) : (
        <Button {...restProps.closeButtonProps} />
      )}
    </div>
  );
}
