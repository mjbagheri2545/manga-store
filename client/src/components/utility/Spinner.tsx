import { LoaderPinwheel, LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type SpinnerProps = LucideProps;

export function Spinner({ className, ...restProps }: SpinnerProps) {
  return (
    <LoaderPinwheel
      {...restProps}
      className={twMerge("size-12 animate-spin", className)}
    />
  );
}
