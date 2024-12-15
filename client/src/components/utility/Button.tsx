import { ComponentProps } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import Spinner from "./Spinner";

const buttonStyles = cva("btn", {
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
  ComponentProps<"button"> & { isLoading?: boolean };

function Button({
  children,
  variant,
  className,
  isLoading,
  disabled,
  ...restProps
}: ButtonProps) {
  return (
    <button
      {...restProps}
      disabled={disabled || isLoading}
      className={twMerge(buttonStyles({ variant }), className)}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

export default Button;
