import { LockIcon } from "lucide-react";

import Card, { CardProps } from "@/components/ui/Card";
import { Button, Image } from "@/components/utility";
import PATH from "@/constants/path";
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
      <div className="flex items-center justify-center relative">
        {chapter.status === "private" && (
          <div className="size-full absolute z-10 bg-black/75 flex items-center justify-center">
            <LockIcon className="size-12 text-white" />
          </div>
        )}
        <figure className="w-full">
          <Image
            className="w-full"
            src={product.productImage}
            alt={product.name}
          />
        </figure>
      </div>
      <div className="card-body p-0 mt-3">
        <div className="flex justify-between items-center">
          <span>فصل {chapter.episode}</span>
          <span>
            {NUMBER_FORMATTER.format(product.oneChapterPriceInToman)} تومان
          </span>
        </div>
        {chapter.status === "private" ? (
          <Button className="mt-2">خرید</Button>
        ) : (
          <Button
            className="mt-2"
            isLinkComponent
            to={PATH.chapter.singleChapter(product.slug, chapter.id)}
          >
            مشاهده
          </Button>
        )}
      </div>
    </Card>
  );
}
