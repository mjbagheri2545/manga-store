import { useEffect } from "react";

import { ApiErrorMessageList } from "@/components/ui/api";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import { DEFAULT_QUERY_TAKE } from "@/constants/global/general.global";
import { useProduct } from "@/contexts/ProductContext";
import { useInfiniteApi } from "@/lib/api";

import productCommentApi from "../../api";
import { useReplies } from "../../contexts/RepliesContext";
import { useRootProductComment } from "../../contexts/RootProductCommentContext";
import ProductCommentRepliesList from "../productCommentsList/ProductCommentRepliesList";

function ProductCommentRepliesListSection() {
  const { replies, setReplies } = useReplies();
  const product = useProduct();
  const rootProductComment = useRootProductComment();

  const {
    error,
    status,
    hasMore,
    loadMoreEntities,
    execute,
    setTotalEntitiesCount,
  } = useInfiniteApi({
    getAllMethod: (paginateQuery) =>
      productCommentApi.getAllReplies({
        productId: product.id,
        parentId: rootProductComment.id,
        query: paginateQuery,
      }),
    entitiesLength: replies.length,
    onSuccess: (data) => setReplies((current) => [...current, ...data.replies]),
  });

  useEffect(() => {
    if (replies.length !== 0) return;

    execute({
      params: { skip: 0, take: DEFAULT_QUERY_TAKE },
      onSuccess: ({ data }) => {
        setReplies(data.replies);
        setTotalEntitiesCount(data.count);
      },
    });
  }, []);

  return (
    <>
      <ProductCommentRepliesList />
      {status === "error" && (
        <ApiErrorMessageList
          error={error}
          messageListItemProps={{ containerProps: { className: "mt-4" } }}
        />
      )}
      {status === "pending" && (
        <SpinnerContainer containerProps={{ className: "mt-4" }} />
      )}
      {hasMore && (
        <LoadMoreButton
          buttonProps={{
            onClick: loadMoreEntities,
            isLoading: status === "pending",
          }}
        />
      )}
    </>
  );
}

export default ProductCommentRepliesListSection;
