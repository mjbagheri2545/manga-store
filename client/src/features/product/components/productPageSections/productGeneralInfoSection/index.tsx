import { Section } from "@/components/ui/layout";
import { Image } from "@/components/utility";
import { useProduct } from "@/contexts/ProductContext";

import ProductListData from "./ProductListData";
import ProductSummaryAndRating from "./ProductSummaryAndRating";

function ProductGeneralInfoSection() {
  const product = useProduct();

  return (
    <>
      <Section
        containerProps={{ className: "flex gap-5 flex-wrap lg:flex-nowrap" }}
      >
        <Image
          src={product.productImage}
          className="w-full max-w-80 md:max-w-64 mx-auto md:mx-0"
        />
        <ProductListData />
        <ProductSummaryAndRating />
      </Section>
    </>
  );
}

export default ProductGeneralInfoSection;
