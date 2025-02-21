import ProductStatusInfo from "@/features/productStatus/components/ProductStatusInfo";

import AdminSection from "../../components/section";
import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function ProductStatusInfoPage() {
  return (
    <>
      <ProductStatusPageHeader title="اطلاعات وضعیت محصول" />
      <AdminSection>
        <ProductStatusInfo />
      </AdminSection>
    </>
  );
}

export default ProductStatusInfoPage;
