import { Section } from "@/components/ui/layout";
import ProductInfo from "@/features/product/components/crud/ProductInfo";

import ProductPageHeader from "./ProductPageHeader";

function ProductInfoPage() {
  return (
    <>
      <ProductPageHeader title="اطلاعات محصول" />
      <Section>
        <ProductInfo />
      </Section>
    </>
  );
}

export default ProductInfoPage;
