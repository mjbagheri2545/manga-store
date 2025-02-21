import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type SpinnerProps = ComponentProps<"span">;

export function Spinner({ className, ...restProps }: SpinnerProps) {
  return (
    <span
      {...restProps}
      className={twMerge("loading loading-spinner w-12", className)}
    />
  );
}
