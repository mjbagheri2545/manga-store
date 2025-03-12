import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import { ProductGroup } from "@/types";

import productApi, { CrudProduct } from "../../api";

const productTableColumns = [
  { key: "name", title: "اسم" },
  { key: "priceInRials", title: "قیمت به ریال" },
  {
    key: "manager",
    title: "مدیر",
    render: (manager: { fullName: string }) => manager.fullName,
  },
  {
    key: "category",
    title: "دسته بندی",
    render: (category: ProductGroup) => category.name,
  },
  {
    key: "status",
    title: "وضعیت",
    render: (status: ProductGroup) => status.name,
  },
  {
    key: "_count",
    title: "تعداد فصل",
    render: (_count: { chapters: number }) => String(_count.chapters),
  },
  { key: "slug", title: "آدرس اینترنتی" },
] as TableColumn<CrudProduct>[];

function ProductsTable() {
  return (
    <CrudTable
      api={productApi}
      entityKey="product"
      getEntitiesFromData={(data) => data.products}
      columns={productTableColumns}
    />
  );
}

export default ProductsTable;
