import { CrudTable, CrudTableProps } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import { ProductGroup } from "@/types";

type ProductGroupTableProps<T> = Pick<
  CrudTableProps<ProductGroup, T>,
  "getEntitiesFromData" | "api" | "entityKey"
>;

export function ProductGroupTable<T>(props: ProductGroupTableProps<T>) {
  const columns = [
    { key: "name", title: "اسم" },
    { key: "slug", title: "آدرس اینترنتی" },
  ] as TableColumn<ProductGroup>[];

  return (
    <CrudTable
      Context={AdminProductGroupContext}
      {...props}
      columns={columns}
    />
  );
}
