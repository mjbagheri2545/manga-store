import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import PATH from "@/constants/path";
import { Chapter } from "@/types";

import chapterApi from "../../api";
import useChapterPageParams from "../../hooks/useChapterPageParams";

const chapterTableColumns = [
  { key: "episode", title: "قسمت" },
  {
    key: "createdAt",
    title: "تاریخ عضویت",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString("fa"),
  },
] as TableColumn<Chapter>[];

function ChaptersTable() {
  const { productId } = useChapterPageParams();

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
