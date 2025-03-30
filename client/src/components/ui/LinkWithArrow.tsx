import { ArrowLeftIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Link, LinkProps } from "../utility";

function LinkWithArrow({ className, children, ...restProps }: LinkProps) {
  return (
    <Link
      {...restProps}
      className={twMerge("group flex gap-2 items-center", className)}
    >
      <span className="flex-1">{children}</span>
      <ArrowLeftIcon className="size-[18px] transition-transform group-hover:-translate-x-1.5 relative mt-1" />
    </Link>
  );
}

export default LinkWithArrow;
