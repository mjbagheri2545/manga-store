import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import PATH from "@/constants/path";
import useProductId from "@/hooks/features/useProductId";
import { Chapter } from "@/types";

import chapterApi from "../../api";

const chapterTableColumns = [
  { key: "episode", title: "قسمت" },
  {
    key: "createdAt",
    title: "تاریخ ایجاد",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString("fa"),
  },
] as TableColumn<Chapter>[];

function ChaptersTable() {
  const productId = useProductId();

  return (
    <CrudTable
      api={{
        delete: ({ id }) => chapterApi.delete({ id, productId }),
        getAll: (query) => chapterApi.getAll({ query, productId }),
      }}
      entityKey="chapter"
      getEntitiesFromData={(data) => data.chapters}
      columns={chapterTableColumns}
      entityPath={PATH.chapter.admin.index(productId)}
    />
  );
}

export default ChaptersTable;
