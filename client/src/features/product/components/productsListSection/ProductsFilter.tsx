import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Section } from "@/components/ui/layout";
import RenderItems from "@/components/ui/RenderItems";
import { Button, Dropdown } from "@/components/utility";
import { ListItem } from "@/components/utility/list";
import { DEFAULT_SORT_ITEMS } from "@/constants/global/general.global";
import { useProductGroups } from "@/contexts/ProductGroupsContext";

const PRODUCT_LIST_SORT_ITEMS = [
  ...DEFAULT_SORT_ITEMS,
  {
    title: "بیشترین بازدید",
    value: "most-views",
  },
  {
    title: "بیشترین فصل",
    value: "most-chapters-count",
  },
  {
    title: "بیشترین امتیاز",
    value: "high-rated",
  },
];

function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearchParams, setLocalSearchParams] = useState({
    sort: searchParams.get("sort") ?? "newest",
    status: searchParams.get("status") ?? "all",
  });

  const { productStatuses } = useProductGroups();

  function handleOnProductStatusChange(index: number) {
    setLocalSearchParams((current) => {
      return { ...current, status: productStatuses[index].slug };
    });
  }

  function handleOnSortChange(index: number) {
    setLocalSearchParams((current) => {
      return { ...current, sort: PRODUCT_LIST_SORT_ITEMS[index].value };
    });
  }

  function handleOnApplyFilter() {
    setSearchParams((searchParams) => {
      if (localSearchParams.sort != null) {
        searchParams.set("sort", localSearchParams.sort);
      }

      if (localSearchParams.status != null) {
        searchParams.set("status", localSearchParams.status);
      }

      return searchParams;
    });
  }

  const localStatus = productStatuses.find(
    (status) => status.slug === localSearchParams.status
  );
  const localSort = PRODUCT_LIST_SORT_ITEMS.find(
    (item) => item.value === localSearchParams.sort
  );

  return (
    <Section
      containerProps={{
        className: "bg-dark flex flex-wrap items-center gap-4 p-3",
      }}
    >
      <div className="flex gap-3 items-center max-md:flex-1 max-sm:w-full max-sm:flex-initial max-sm:px-2">
        <Dropdown title="مرتب سازی" containerProps={{ className: "flex-1" }}>
          {(onClose) => (
            <RenderItems
              items={PRODUCT_LIST_SORT_ITEMS}
              renderItem={(item, index) => (
                <ListItem
                  isGutterLess
                  containerProps={{
                    onClick: () => {
                      handleOnSortChange(index);
                      onClose();
                    },
                  }}
                >
                  <span className="inline-block px-4 py-3">{item.title}</span>
                </ListItem>
              )}
            />
          )}
        </Dropdown>
        {localSort != null && (
          <span className="inline-block min-w-fit">{localSort.title}</span>
        )}
      </div>
      <div className="flex gap-3 items-center max-md:flex-1 max-sm:w-full max-sm:flex-initial max-sm:px-2">
        <Dropdown title="وضعیت" containerProps={{ className: "flex-1" }}>
          {(onClose) => (
            <>
              <ListItem
                isGutterLess
                containerProps={{
                  onClick: () => {
                    setLocalSearchParams((current) => {
                      return {
                        ...current,
                        status: "all",
                      };
                    });
                    onClose();
                  },
                }}
              >
                <span className="inline-block px-4 py-3">همه</span>
              </ListItem>
              <RenderItems
                items={productStatuses}
                renderItem={(item, index) => (
                  <ListItem
                    isGutterLess
                    containerProps={{
                      onClick: () => {
                        handleOnProductStatusChange(index);
                        onClose();
                      },
                    }}
                  >
                    <span className="inline-block px-4 py-3">{item.name}</span>
                  </ListItem>
                )}
              />
            </>
          )}
        </Dropdown>
        {
          <span className="inline-block min-w-fit">
            {localStatus?.name ?? "همه"}
          </span>
        }
      </div>
      <Button
        onClick={handleOnApplyFilter}
        className="w-full md:w-auto mr-auto"
      >
        اعمال فیلتر
      </Button>
    </Section>
  );
}

export default ProductsFilter;
