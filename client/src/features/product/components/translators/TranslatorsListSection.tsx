import { useState } from "react";

import { ApiComponent, ApiErrorMessageList } from "@/components/ui/api";
import { Section, SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import SortFilter, { SortFilterItem } from "@/components/ui/SortFilter";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import { Alert } from "@/components/utility";
import { DEFAULT_SORT_ITEMS } from "@/constants/global/general.global";
import PATH from "@/constants/path";
import {
  GetAllTranslatorBase,
  GetAllTranslatorsResponse,
  useProduct,
} from "@/contexts/ProductContext";
import { useQuerySort } from "@/hooks";
import { useInfiniteApi } from "@/lib/api";

import productApi from "../../api";
import { TRANSLATORS_QUERY_TAKE } from "../../constants/global";
import TranslatorsList from "./TranslatorsList";

const TRANSLATORS_LIST_SORT_ITEMS: SortFilterItem[] = [
  ...DEFAULT_SORT_ITEMS,
  { title: "بیشترین فصل ترجمه شده", value: "most-translated-chapters-count" },
];

function TranslatorsListSection() {
  const { product } = useProduct();
  const sort = useQuerySort();

  return (
    <ApiComponent
      apiMethod={() =>
        productApi.getRelatedTranslators({
          slug: product.slug,
          query: {
            skip: 0,
            take: TRANSLATORS_QUERY_TAKE,
            sort,
          },
        })
      }
      apiMethodOptions={{ dependencies: [product.id] }}
    >
      {(data) => <TranslatorsListSectionChildren {...data} />}
    </ApiComponent>
  );
}

export default TranslatorsListSection;

function TranslatorsListSectionChildren(props: GetAllTranslatorsResponse) {
  const [translators, setTranslators] = useState<GetAllTranslatorBase[]>(
    props.translators
  );
  const sort = useQuerySort();
  const { product } = useProduct();

  const { error, status, hasMore, loadMoreEntities } = useInfiniteApi({
    getAllMethod: (paginateQuery) =>
      productApi.getRelatedTranslators({
        slug: product.slug,
        query: {
          ...paginateQuery,
          sort,
        },
      }),
    initialTotalCount: props.count,
    entitiesLength: translators.length,
    onSuccess: (data) =>
      setTranslators((current) => [...current, ...data.translators]),
  });

  if (props.count === 0) {
    return (
      <Alert type="info" containerProps={{ className: "text-lg" }}>
        هیج مترجمی یافت نشد
      </Alert>
    );
  }

  return (
    <>
      <SortFilter items={TRANSLATORS_LIST_SORT_ITEMS} />
      <Section>
        <SectionTitle title="همه مترجم ها">
          <LinkWithArrow to={PATH.product.singleProduct(product.slug)}>
            {product.name}
          </LinkWithArrow>
        </SectionTitle>
        <TranslatorsList translators={translators} />
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
