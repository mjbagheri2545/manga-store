import { ComponentProps } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva("btn", {
  variants: {
    variant: {
      default: "text-[1rem] px-6 rounded-sm btn-primary",
      icon: "p-0 hover:bg-slate-50/10 border-none rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

function Button({ children, variant, className, ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className={twMerge(buttonStyles({ variant }), className)}
    >
      {children}
    </button>
  );
}

export default Button;
