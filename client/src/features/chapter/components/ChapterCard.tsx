import Card, { CardProps } from "@/components/ui/Card";
import { Button, Image, Link } from "@/components/utility";
import { useProduct } from "@/contexts/ProductContext";
import { NUMBER_FORMATTER } from "@/utils";

import { GetAllChapterBase } from "../api";

type ChapterCardProps = {
  chapter: GetAllChapterBase;
  cardProps?: CardProps;
};

export function ChapterCard({ chapter, cardProps }: ChapterCardProps) {
  const product = useProduct();

  return (
    <Card {...cardProps}>
      <Link to="#" className="size-full text-white hover:text-white">
        <figure className="w-full">
          <Image
            className="w-full"
            src={product.productImage}
            alt={product.name}
          />
        </figure>
        <div className="card-body p-0 mt-3">
          <div className="flex justify-between items-center">
            <span>فصل {chapter.episode}</span>
            <span>
              {NUMBER_FORMATTER.format(product.oneChapterPriceInToman)} تومان
            </span>
          </div>
          <Button className="mt-2">خرید</Button>
        </div>
      </Link>
    </Card>
  );
}
