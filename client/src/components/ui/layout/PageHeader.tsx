import { PropsWithChildren } from "react";

import { cn } from "@/utils";

export type PageHeaderProps = PropsWithChildren & {
  title: string;
};

export function PageHeader({ title, children }: PageHeaderProps) {
  const containerClassName = cn(
    "px-4 py-6 bg-dark w-full",
    children != null &&
      "flex items-center justify-between max-sm:flex-wrap gap-4"
  );

  return (
    <div className={containerClassName}>
      <div className="flex gap-3 h-fit max-sm:w-full">
        <span className="inline-block w-1 rounded-lg bg-primary" />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
