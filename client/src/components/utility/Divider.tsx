import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export function Divider({ className, ...restProps }: ComponentProps<"hr">) {
  return (
    <hr
      {...restProps}
      className={twMerge(
        "border-t-[0.5px] w-full border-t-slate-50/25 mx-[2%] my-4",
        className
      )}
    />
  );
}
