import { useState } from "react";

import { ApiComponent, ApiErrorMessageList } from "@/components/ui/api";
import { Section, SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import SortFilter from "@/components/ui/SortFilter";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import { Alert } from "@/components/utility";
import { DEFAULT_SORT_ITEMS } from "@/constants/global/general.global";
import PATH from "@/constants/path";
import { useProduct } from "@/contexts/ProductContext";
import chapterApi, {
  GetAllChapterBase,
  GetAllChaptersResponse,
} from "@/features/chapter/api";
import ChapterList from "@/features/chapter/components/ChapterList";
import { useQuerySort } from "@/hooks";
import { useInfiniteApi } from "@/lib/api";

import { CHAPTERS_QUERY_TAKE } from "../constants/global";

function ChaptersListSection() {
  const sort = useQuerySort();
  const { product } = useProduct();

  return (
    <ApiComponent
      apiMethod={() =>
        chapterApi.getAll({
          productId: product.id,
          query: {
            skip: 0,
            take: CHAPTERS_QUERY_TAKE,
            sort,
          },
        })
      }
      apiMethodOptions={{ dependencies: [product.id] }}
    >
      {(data) => <ChaptersListSectionChildren {...data} />}
    </ApiComponent>
  );
}

export default ChaptersListSection;

function ChaptersListSectionChildren(props: GetAllChaptersResponse) {
  const [chapters, setChapters] = useState<GetAllChapterBase[]>(props.chapters);
  const sort = useQuerySort();
  const { product } = useProduct();

  const { error, status, hasMore, loadMoreEntities } = useInfiniteApi({
    getAllMethod: (paginateQuery) =>
      chapterApi.getAll({
        productId: product.id,
        query: {
          skip: paginateQuery?.skip,
          take: CHAPTERS_QUERY_TAKE,
          sort,
        },
      }),
    initialTotalCount: props.count,
    entitiesLength: chapters.length,
    onSuccess: (data) =>
      setChapters((current) => [...current, ...data.chapters]),
  });

  if (props.count === 0) {
    return (
      <Alert type="info" containerProps={{ className: "text-lg" }}>
        هیج فصلی یافت نشد
      </Alert>
    );
  }

  return (
    <>
      <SortFilter items={DEFAULT_SORT_ITEMS} />
      <Section containerProps={{ className: "bg-dark-body" }}>
        <SectionTitle title="همه فصل ها">
          <LinkWithArrow to={PATH.product.singleProduct(product.slug)}>
            {product.name}
          </LinkWithArrow>
        </SectionTitle>
        <ChapterList chapters={chapters} />
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
