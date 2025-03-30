import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

export type SectionProps = PropsWithContainer<"section"> & PropsWithChildren;

export function Section({ containerProps, children }: SectionProps) {
  return (
    <section
      {...containerProps}
      className={twMerge("px-4 py-6 w-full bg-dark", containerProps?.className)}
    >
      {children}
    </section>
  );
}
