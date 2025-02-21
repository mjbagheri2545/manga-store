import { ComponentProps } from "react";
import { Link, LinkProps } from "react-router-dom";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { cn } from "@/utils";

import { Spinner, SpinnerProps } from ".";

const buttonStyles = cva("btn disabled:bg-slate-500/15 min-h-0", {
  variants: {
    variant: {
      default: "text-[1rem] px-6 rounded btn-primary",
      icon: "p-0 size-12 bg-transparent hover:bg-slate-50/10 border-none rounded-full opacity-100",
    },
    iconType: {
      info: "[&_svg]:text-info hover:bg-sky-500/15",
      success: "[&_svg]:text-success hover:bg-green-500/15",
      warning: "[&_svg]:text-warning hover:bg-yellow-500/15",
      error: "[&_svg]:text-error hover:bg-red-500/15",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonComponents =
  | ({
      isLinkComponent?: false;
      isLoading?: boolean;
      spinnerProps?: SpinnerProps;
    } & ComponentProps<"button">)
  | ({
      isLinkComponent: true;
    } & LinkProps);

export type ButtonProps = VariantProps<typeof buttonStyles> &
  ButtonComponents & {
    isWide?: boolean;
  };

export function Button({
  children,
  variant,
  className,
  iconType,
  isWide = false,
  ...restProps
}: ButtonProps) {
  const finalClassName = cn(
    buttonStyles({ variant, iconType }),
    isWide && "btn-block sm:btn-wide",
    className
  );

  if (restProps.isLinkComponent) {
    const { isLinkComponent: _, ...restLinkProps } = restProps;
    return (
      <Link {...restLinkProps} className={finalClassName}>
        {children}
      </Link>
    );
  }

  const {
    disabled,
    isLoading,
    spinnerProps,
    isLinkComponent: _,
    ...restButtonProps
  } = restProps;

  return (
    <button
      {...restButtonProps}
      disabled={disabled || isLoading}
      className={finalClassName}
    >
      {isLoading ? (
        <Spinner
          {...spinnerProps}
          className={twMerge("w-8", spinnerProps?.className)}
        />
      ) : (
        children
      )}
    </button>
  );
}
