import React, { PropsWithChildren } from "react";

export type AdminPageHeaderProps = PropsWithChildren & {
  title: string;
};

function AdminPageHeader({ title, children }: AdminPageHeaderProps) {
  const finalChildren = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...children.props,
        className: "max-sm:w-full text-center",
      })
    : children;

  return (
    <div className="flex gap-6 items-center justify-between w-full px-4 mb-2 max-sm:flex-wrap max-sm:justify-center max-sm:gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {finalChildren}
    </div>
  );
}

export default AdminPageHeader;
