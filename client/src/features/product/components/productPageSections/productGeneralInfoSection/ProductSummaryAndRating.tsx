import { NotebookTextIcon } from "lucide-react";

import TextWithIcon from "@/components/ui/TextWithIcon";
import { useProduct } from "@/contexts/ProductContext";

import ProductRating from "./ProductRating";

function ProductSummaryAndRating() {
  const { product } = useProduct();
  return (
    <div className="w-full max-w-none lg:max-w-[19rem] flex flex-col mt-3 lg:mt-0">
      <ProductRating />
      <div className="bg-dark-body flex flex-col p-4">
        <TextWithIcon Icon={NotebookTextIcon} className="mb-4">
          <span className="font-semibold text-lg"> خلاصه داستان: </span>
        </TextWithIcon>
        <p className="mb-2">{product.summary}</p>
      </div>
    </div>
  );
}

export default ProductSummaryAndRating;
