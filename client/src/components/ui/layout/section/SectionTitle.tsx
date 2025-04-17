import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type SectionTitleProps = ComponentProps<"div"> & {
  title: string;
};

export function SectionTitle({
  title,
  className,
  children,
  ...restProps
}: SectionTitleProps) {
  // with discriminated union types we sure title is string
  return (
    <div
      {...restProps}
      className={twMerge(
        "flex justify-between mb-5 px-3 flex-wrap gap-4",
        className
      )}
    >
      <div className="flex gap-3 h-fit max-sm:w-full">
        <span className="block w-1 rounded-lg bg-primary" />
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}
