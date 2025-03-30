import React from "react";
import { Link } from "react-router-dom";

import { DollarSignIcon, EyeIcon } from "lucide-react";

import RenderItems from "@/components/ui/RenderItems";
import TextWithIcon from "@/components/ui/TextWithIcon";
import { List, ListItem } from "@/components/utility/list";
import PATH from "@/constants/path";
import { ProductBySlug, useProduct } from "@/contexts/ProductContext";
import { ProductGroup } from "@/types";
import { NUMBER_FORMATTER } from "@/utils";

import { StatusCard } from "../../StatusCard";

type RenderItemOptions = ProductBySlug[keyof ProductBySlug];

type ListItemData = {
  key: keyof ProductBySlug;
  itemName: string;
  renderItem?: (options: RenderItemOptions) => React.ReactNode;
};

const PRODUCT_LIST_DATA = [
  {
    key: "persianName",
    itemName: "نام فارسی",
  },
  {
    key: "category",
    itemName: "نوع",
    renderItem: (category: ProductGroup) => category.name,
  },
  {
    key: "status",
    itemName: "وضعیت",
    renderItem: (status: ProductGroup) => (
      <StatusCard status={status} className="static" />
    ),
  },
  {
    key: "chaptersCount",
    itemName: "تعداد فصل",
  },
  {
    key: "releaseYear",
    itemName: "سال انتشار",
  },
  {
    key: "designer",
    itemName: "طراح",
  },
  {
    key: "writer",
    itemName: "نویسنده",
  },
] as ListItemData[];

function ProductListData() {
  const { product } = useProduct();

  return (
    <div className="w-full md:w-auto flex-none md:flex-1 flex flex-col mt-3 md:mt-0">
      <div className="w-full flex gap-6">
        <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
        <TextWithIcon
          Icon={EyeIcon}
          className="h-fit mt-[3px] border border-primary rounded px-1.5 py-0.5 lg:mx-auto"
        >
          {NUMBER_FORMATTER.format(product.views)}
        </TextWithIcon>
      </div>
      <List className="gap-2 mb-4">
        <RenderItems
          items={PRODUCT_LIST_DATA}
          renderItem={(item) => (
            <ListItem isGutterLess>
              {item.itemName}: {(item.renderItem ?? String)(product[item.key])}
            </ListItem>
          )}
        />
      </List>
      <TextWithIcon className="mb-3" Icon={DollarSignIcon}>
        <span className="text-lg font-semibold">
          قیمت هر فصل: {NUMBER_FORMATTER.format(product.oneChapterPriceInToman)}{" "}
          تومان
        </span>
      </TextWithIcon>
      <List className="gap-3 flex-wrap flex-row">
        {product.tags.map((tag) => (
          <ListItem
            key={tag.id}
            containerProps={{
              className:
                "badge badge-neutral bg-dark-body/75 text-white hover:bg-slate-50/10 flex-initial h-fit p-0",
            }}
          >
            <Link
              to={PATH.product.byTag(tag.slug)}
              className="w-full text-center pt-1.5 pb-2 px-4"
            >
              {tag.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ProductListData;
