import React from "react";

import { Table, TableColumn, TableProps } from "./Table";

type TableWithActionsProps<TEntity extends { id: string }> =
  TableProps<TEntity> & {
    children: (id: string) => React.ReactNode;
  };

export function TableWithActions<TEntity extends { id: string }>({
  columns,
  children,
  ...restProps
}: TableWithActionsProps<TEntity>) {
  const finalColumns = [
    ...columns,
    {
      key: "id",
      title: "عملیات",
      render: children,
      cellProps: { className: "flex gap-2" },
    },
  ] as TableColumn<TEntity>[];

  return <Table {...restProps} columns={finalColumns} />;
}
