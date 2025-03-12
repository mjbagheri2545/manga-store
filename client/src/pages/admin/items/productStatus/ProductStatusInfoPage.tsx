import { Section } from "@/components/ui/layout";
import ProductStatusInfo from "@/features/productStatus/components/ProductStatusInfo";

import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function ProductStatusInfoPage() {
  return (
    <>
      <ProductStatusPageHeader title="اطلاعات وضعیت محصول" />
      <Section>
        <ProductStatusInfo />
      </Section>
    </>
  );
}

export default ProductStatusInfoPage;
