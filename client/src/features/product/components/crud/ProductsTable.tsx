import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import { ProductGroup } from "@/types";
import { NUMBER_FORMATTER } from "@/utils";

import productApi, { CrudProduct } from "../../api";

const productTableColumns = [
  { key: "name", title: "اسم" },
  {
    key: "oneChapterPriceInToman",
    title: "قیمت هر فصل",
    render: (oneChapterPriceInToman: number) =>
      `${NUMBER_FORMATTER.format(oneChapterPriceInToman)} تومان`,
  },
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
    key: "chaptersCount",
    title: "تعداد فصل",
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
