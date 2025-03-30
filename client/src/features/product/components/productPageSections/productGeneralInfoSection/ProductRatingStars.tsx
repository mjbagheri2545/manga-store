import { StarIcon } from "lucide-react";

import RenderItems from "@/components/ui/RenderItems";
import { cn } from "@/utils";

type ProductRatingStarsProps = {
  ratingNumber: number;
  handleOnRatingChange: (index: number) => void;
};

function ProductRatingStars({
  ratingNumber,
  handleOnRatingChange,
}: ProductRatingStarsProps) {
  return (
    <div className="items-center mt-3 flex justify-center gap-2" dir="ltr">
      <RenderItems
        items={Array(5).fill(undefined)}
        renderItem={(_, index) => {
          return (
            <StarIcon
              onClick={() => handleOnRatingChange(index)}
              className={cn(
                "stroke-slate-500/25 fill-slate-500/25 cursor-pointer transition duration-150 size-7",
                ratingNumber >= index && "fill-warning stroke-warning"
              )}
            />
          );
        }}
      />
    </div>
  );
}

export default ProductRatingStars;
