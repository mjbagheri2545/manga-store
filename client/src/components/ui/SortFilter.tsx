import { useSearchParams } from "react-router-dom";

import RenderItems from "@/components/ui/RenderItems";
import { Dropdown } from "@/components/utility";
import { ListItem } from "@/components/utility/list";

import { Section } from "./layout";

export type SortFilterItem = {
  title: string;
  value: string;
};

type SortFilterProps = {
  items: SortFilterItem[];
};

function SortFilter({ items }: SortFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "newest";

  function handleOnSortChange(index: number) {
    setSearchParams((searchParams) => {
      searchParams.set("sort", items[index].value);

      return searchParams;
    });
  }

  const localSort = items.find((item) => item.value === sort);

  return (
    <Section
      containerProps={{
        className:
          "bg-dark flex flex-wrap items-center gap-3 max-md:flex-1 max-sm:flex-initial p-3",
      }}
    >
      <Dropdown title="مرتب سازی">
        {(onClose) => (
          <RenderItems
            items={items}
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
    </Section>
  );
}

export default SortFilter;
