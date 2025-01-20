import { ComponentProps } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const linkStyles = cva("link transition no-underline", {
  variants: {
    variant: {
      default: "text-sky-500 hover:text-sky-600",
      navigation: "text-white hover:text-white/60",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkProps = VariantProps<typeof linkStyles> &
  ComponentProps<"a"> &
  RouterLinkProps;

export function Link({
  children,
  variant,
  className,
  ...restProps
}: LinkProps) {
  return (
    <RouterLink
      {...restProps}
      className={twMerge(linkStyles({ variant }), className)}
    >
      {children}
    </RouterLink>
  );
}
