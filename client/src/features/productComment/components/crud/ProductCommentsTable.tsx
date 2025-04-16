import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import PATH from "@/constants/path";
import {
  GetAllProductCommentBaseDislike,
  GetAllProductCommentBaseLike,
  GetAllRootProductCommentBase,
} from "@/contexts/ProductContext";
import useProductId from "@/hooks/features/useProductId";

import productCommentApi from "../../api";

const productCommentTableColumns = [
  { key: "message", title: "پیام" },
  {
    key: "author",
    title: "نویسنده",
    renderItem: (author: GetAllRootProductCommentBase["author"]) =>
      author.fullName,
  },
  {
    key: "like",
    title: "تعداد لایک",
    renderItem: (like: GetAllProductCommentBaseLike) => like.count,
  },
  {
    key: "dislike",
    title: "تعداد دیسلایک",
    renderItem: (dislike: GetAllProductCommentBaseDislike) => dislike.count,
  },
  {
    key: "createdAt",
    title: "تاریخ ایجاد",
    renderItem: (createdAt: string) =>
      new Date(createdAt).toLocaleDateString("fa"),
  },
  {
    key: "updatedAt",
    title: "تاریخ آخرین به‌روزرسانی",
    renderItem: (updatedAt: string) =>
      new Date(updatedAt).toLocaleDateString("fa"),
  },
] as TableColumn<GetAllRootProductCommentBase>[];

function ProductCommentsTable() {
  const productId = useProductId();

  return (
    <CrudTable
      api={{
        delete: ({ id }) => productCommentApi.delete({ id, productId }),
        getAll: (query) => productCommentApi.getAll({ query, productId }),
      }}
      entityKey="productComment"
      getEntitiesFromData={(data) => data.rootProductComments}
      columns={productCommentTableColumns}
      entityPath={PATH.productComment.admin.index(productId)}
      isEditPageNeed={false}
    />
  );
}

export default ProductCommentsTable;
