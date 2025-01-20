import { ComponentProps } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { Spinner, SpinnerProps } from ".";

const buttonStyles = cva("btn disabled:bg-slate-500/15", {
  variants: {
    variant: {
      default: "text-[1rem] px-6 rounded-sm btn-primary",
      icon: "p-0 size-12 hover:bg-slate-50/10 border-none rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & {
    isLoading?: boolean;
    spinnerProps?: SpinnerProps;
  };

export function Button({
  children,
  variant,
  className,
  isLoading,
  disabled,
  spinnerProps,
  ...restProps
}: ButtonProps) {
  return (
    <button
      {...restProps}
      disabled={disabled || isLoading}
      className={twMerge(buttonStyles({ variant }), className)}
    >
      {isLoading ? (
        <Spinner
          {...spinnerProps}
          className={twMerge("size-8", spinnerProps?.className)}
        />
      ) : (
        children
      )}
    </button>
  );
}
