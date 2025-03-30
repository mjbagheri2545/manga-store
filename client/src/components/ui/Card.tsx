import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type CardProps = ComponentProps<"div">;

function Card({ children, className, ...restProps }: CardProps) {
  return (
    <div
      {...restProps}
      className={twMerge(
        "card cursor-pointer group border border-slate-50/25 bg-dark p-3 rounded-sm transition hover:translate-y-[-1px] hover:scale-[1.035]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
