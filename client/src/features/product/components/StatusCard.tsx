import { ProductGroup } from "@/types";
import { cn } from "@/utils";

type StatusCardProps = {
  status: ProductGroup;
  className?: string;
};

export function StatusCard({ status, className }: StatusCardProps) {
  const statusClassName = cn(
    "absolute z-10 badge pb-1 px-3 flex h-fit text-white top-1 left-1 rounded",
    status.slug === "unpublished" && "badge-error",
    status.slug === "ongoing" && "badge-success",
    status.slug === "completed" && "badge-info",
    className
  );

  return <span className={statusClassName}>{status.name}</span>;
}
