import { useEffect } from "react";

import { ApiErrorMessageList } from "@/components/ui/api";
import { Section, SectionTitle } from "@/components/ui/layout";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import SingleProductLink from "@/components/ui/product/SingleProductLink";
import SortFilter, { SortFilterItem } from "@/components/ui/SortFilter";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import {
  DEFAULT_QUERY_TAKE,
  DEFAULT_SORT_ITEMS,
} from "@/constants/global/general.global";
import { useProduct } from "@/contexts/ProductContext";
import { useQuerySort } from "@/hooks";
import { useInfiniteApi } from "@/lib/api";

import productCommentApi from "../../api";
import { useRootProductComments } from "../../contexts/RootProductCommentsContext";
import CreateProductCommentForm from "../crud/CreateProductCommentForm";
import RootProductCommentList from "../productCommentsList/RootProductCommentsList";

const ROOT_PRODUCT_COMMENTS_SORT_ITEMS: SortFilterItem[] = [
  ...DEFAULT_SORT_ITEMS,
  { title: "بیشترین لایک", value: "most-likes-count" },
  { title: "بیشترین دیسلایک", value: "most-dislikes-count" },
];

function RootProductCommentListSection() {
  const { rootProductComments, setRootProductComments } =
    useRootProductComments();
  const product = useProduct();
  const sort = useQuerySort();

  const {
    error,
    status,
    hasMore,
    totalEntitiesCount,
    execute,
    setTotalEntitiesCount,
    loadMoreEntities,
  } = useInfiniteApi({
    getAllMethod: (paginateQuery) =>
      productCommentApi.getAll({
        productId: product.id,
        query: { ...paginateQuery, sort },
      }),
    entitiesLength: rootProductComments.length,
    onSuccess: (data) =>
      setRootProductComments((current) => [
        ...current,
        ...data.rootProductComments,
      ]),
  });

  useEffect(() => {
    if (rootProductComments.length !== 0) return;

    execute({
      params: { skip: 0, take: DEFAULT_QUERY_TAKE },
      onSuccess: ({ data }) => {
        setRootProductComments(data.rootProductComments);
        setTotalEntitiesCount(data.count);
      },
    });
  }, []);

  return (
    <>
      <Section>
        <CreateProductCommentForm />
      </Section>
      <SortFilter items={ROOT_PRODUCT_COMMENTS_SORT_ITEMS} />
      <Section containerProps={{ className: "bg-dark-body px-0" }}>
        <SectionTitle title={`${totalEntitiesCount} دیدگاه`}>
          <SingleProductLink />
        </SectionTitle>
        <RootProductCommentList />
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
      </Section>
    </>
  );
}

export default RootProductCommentListSection;
