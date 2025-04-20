import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import { Spinner, SpinnerProps } from "../utility";

export type SpinnerContainerProps = PropsWithContainer & {
  spinnerProps?: SpinnerProps;
};

export function SpinnerContainer({
  spinnerProps,
  containerProps,
}: SpinnerContainerProps) {
  return (
    <div
      {...containerProps}
      className={twMerge(
        "flex flex-1 justify-center items-center",
        containerProps?.className
      )}
    >
      <Spinner
        {...spinnerProps}
        className={twMerge("w-24", spinnerProps?.className)}
      />
    </div>
  );
}
