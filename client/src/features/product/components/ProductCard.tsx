import { EyeIcon } from "lucide-react";

import Card, { CardProps } from "@/components/ui/Card";
import { Image, Link } from "@/components/utility";
import PATH from "@/constants/path";
import { NUMBER_FORMATTER } from "@/utils";

import { GetAllProductBase } from "../api";
import { StatusCard } from "./StatusCard";

type ProductCardProps = {
  product: GetAllProductBase;
  cardProps?: CardProps;
};

export function ProductCard({ product, cardProps }: ProductCardProps) {
  const {
    name,
    chaptersCount,
    productImage,
    slug,
    status,
    oneChapterPriceInToman,
    views,
    releaseYear,
    summary,
  } = product;

  return (
    <Card {...cardProps}>
      <Link
        to={PATH.product.singleProduct(slug)}
        className="size-full text-white hover:text-white"
      >
        <div className="flex items-center justify-center relative overflow-hidden">
          <StatusCard status={status} />
          <span className="absolute z-10 badge badge-accent pb-1 pt-0.5 px-3 flex h-fit text-white top-1 right-1 rounded">
            {releaseYear}
          </span>
          <span className="absolute z-10 badge badge-info pb-1 px-3 flex h-fit text-white bottom-1 right-1 rounded">
            {chaptersCount} فصل
          </span>
          <p className="absolute inset-0 transition -translate-x-full group-hover:translate-x-0 bg-black/75 z-20 p-1.5 pt-1">
            {summary}
          </p>
          <figure className="w-full">
            <Image className="w-full" src={productImage} alt={name} />
          </figure>
        </div>
        <div className="card-body p-0 mt-3">
          <h3
            className="card-title !text-base mb-2 text-left text-wrap"
            dir="ltr"
          >
            {name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <span>{NUMBER_FORMATTER.format(oneChapterPriceInToman)} تومان</span>
            <div className="flex items-center gap-1.5">
              <span>{NUMBER_FORMATTER.format(views)}</span>
              <EyeIcon className="size-5" />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
