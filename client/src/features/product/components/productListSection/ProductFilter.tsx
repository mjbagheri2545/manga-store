import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, Dropdown } from "@/components/utility";
import { ListItem } from "@/components/utility/list";
import RenderItems from "@/components/utility/RenderItems";
import { useProductGroups } from "@/contexts/ProductGroupsContext";

const SORT_ITEMS = [
  {
    title: "جدید ترین",
    value: "newest",
  },
  {
    title: "قدیمی ترین",
    value: "oldest",
  },
];

function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearchParams, setLocalSearchParams] = useState({
    sort: searchParams.get("sort"),
    status: searchParams.get("status"),
  });

  const { productStatuses } = useProductGroups();

  function handleOnProductStatusChange(index: number) {
    setLocalSearchParams((current) => {
      return { ...current, status: productStatuses[index].slug };
    });
  }

  function handleOnSortChange(index: number) {
    setLocalSearchParams((current) => {
      return { ...current, sort: SORT_ITEMS[index].value };
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
  const localSort = SORT_ITEMS.find(
    (item) => item.value === localSearchParams.sort
  );

  return (
    <div className="bg-dark mb-6 flex flex-wrap w-full items-center gap-4 p-3">
      <div className="flex gap-3 items-center max-md:flex-1 max-sm:w-full max-sm:flex-initial max-sm:px-2">
        <Dropdown title="مرتب سازی" containerProps={{ className: "flex-1" }}>
          {(onClose) => (
            <RenderItems
              items={SORT_ITEMS}
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
          )}
        </Dropdown>
        {localStatus != null && (
          <span className="inline-block min-w-fit">{localStatus.name}</span>
        )}
      </div>
      <Button
        onClick={handleOnApplyFilter}
        className="w-full md:w-auto mr-auto"
      >
        اعمال فیلتر
      </Button>
    </div>
  );
}

export default ProductFilter;
