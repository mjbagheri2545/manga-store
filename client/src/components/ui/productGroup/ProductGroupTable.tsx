import { CrudTable, CrudTableProps } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import { ProductGroup } from "@/types";

type ProductGroupTableProps<T> = Pick<
  CrudTableProps<ProductGroup, T>,
  "getEntitiesFromData" | "api" | "entityKey"
>;

const productGroupTableColumns = [
  { key: "name", title: "اسم" },
  { key: "slug", title: "آدرس اینترنتی" },
] as TableColumn<ProductGroup>[];

export function ProductGroupTable<T>(props: ProductGroupTableProps<T>) {
  return <CrudTable {...props} columns={productGroupTableColumns} />;
}
