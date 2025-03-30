import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export function ModalContent({
  children,
  className,
  ...restProps
}: ComponentProps<"div">) {
  return (
    <div
      {...restProps}
      className={twMerge(
        "modal-box max-[480px]:p-4 shadow-md shadow-slate-950/80 bg-slate-900",
        className
      )}
      role="dialog"
    >
      {children}
    </div>
  );
}
