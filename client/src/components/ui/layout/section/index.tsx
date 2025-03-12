import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import SectionTitle, { SectionTitleProps } from "./SectionTitle";

type AdminSectionProps = PropsWithContainer<"section"> &
  PropsWithChildren &
  SectionTitleProps;

export function Section({
  containerProps,
  children,
  ...restProps
}: AdminSectionProps) {
  return (
    <section
      {...containerProps}
      className={twMerge("px-4 py-6 w-full bg-dark", containerProps?.className)}
    >
      <SectionTitle {...restProps} />
      {children}
    </section>
  );
}
