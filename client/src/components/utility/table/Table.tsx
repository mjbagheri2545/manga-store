import React, { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import RenderItems from "../RenderItems";
import { Spinner } from "../Spinner";

type CellProps = ComponentProps<"th" | "td">;

export type TableColumn<T> = {
  key: keyof T;
  title: string;
  cellProps?: CellProps;
  render?: (value: T[keyof T]) => React.ReactNode;
};

type RowProps = ComponentProps<"tr">;

export type TableProps<T> = PropsWithContainer & {
  rows: T[];
  columns: TableColumn<T>[];
  tableProps?: ComponentProps<"table">;
  rowProps?: RowProps | ((index: number) => RowProps);
  columnHeaderProps?: RowProps;
  isLoading?: boolean;
};

export function Table<T>({
  containerProps,
  tableProps,
  columns,
  rows,
  rowProps,
  columnHeaderProps,
  isLoading,
}: TableProps<T>) {
  const containerClassName = twMerge(
    "overflow-x-auto",
    containerProps?.className
  );

  const tableClassName = twMerge(
    "table table-auto table-lg border border-slate-600",
    tableProps?.className
  );

  return (
    <div {...containerProps} className={containerClassName}>
      <table {...tableProps} className={tableClassName}>
        <TableHeader columns={columns} columnHeaderProps={columnHeaderProps} />
        <tbody>
          <RenderItems
            items={rows}
            renderItem={(row, index) => {
              const finalRowProps =
                typeof rowProps === "function" ? rowProps(index) : rowProps;
              return (
                <TableRow
                  columns={columns}
                  row={row}
                  rowProps={finalRowProps}
                  index={index}
                />
              );
            }}
          />
          {isLoading && <TableLoader />}
        </tbody>
      </table>
    </div>
  );
}

function TableLoader() {
  return (
    <tr className="h-[100px] relative">
      <td colSpan={100}>
        <Spinner className="absolute top-[15px] w-[70px] right-[calc(50%-35px)]" />
      </td>
    </tr>
  );
}

type TableHeaderProps<T> = Pick<TableProps<T>, "columns" | "columnHeaderProps">;

function TableHeader<T>({ columns, columnHeaderProps }: TableHeaderProps<T>) {
  const tableHeaderCellClassName = "text-white text-sm px-3";

  return (
    <thead className="sticky -top-0.5 z-10">
      <tr
        {...columnHeaderProps}
        className={twMerge(
          "bg-dark-body border-slate-600",
          columnHeaderProps?.className
        )}
      >
        <th className={tableHeaderCellClassName}>شماره</th>
        <RenderItems
          items={columns}
          renderItem={(item) => (
            <th
              {...item.cellProps}
              className={twMerge(
                tableHeaderCellClassName,
                item.cellProps?.className
              )}
            >
              {item.title}
            </th>
          )}
        />
      </tr>
    </thead>
  );
}

type TableRowProps<T> = Pick<TableProps<T>, "columns"> & {
  row: T;
  rowProps?: RowProps;
  index: number;
};

function TableRow<T>({ row, columns, rowProps, index }: TableRowProps<T>) {
  return (
    <tr
      {...rowProps}
      className={twMerge("border-slate-600", rowProps?.className)}
    >
      <td className="py-2 px-3">{index + 1}</td>
      <RenderItems
        items={columns}
        renderItem={(column) => (
          <TableCell
            render={column.render}
            value={row[column.key]}
            cellProps={column.cellProps}
          />
        )}
      />
    </tr>
  );
}

type TableCellProps<T> = {
  value: T;
  render?: (value: T) => React.ReactNode;
  cellProps?: CellProps;
};

function TableCell<T>({ cellProps, value, render }: TableCellProps<T>) {
  // w-[1%] whitespace-nowrap this is a trick i saw in somewhere
  return (
    <td
      {...cellProps}
      className={twMerge(
        "py-2 px-3 w-[1%] whitespace-nowrap",
        cellProps?.className
      )}
    >
      {(render ?? String)(value)}
    </td>
  );
}
