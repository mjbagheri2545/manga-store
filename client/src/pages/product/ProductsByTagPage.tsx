import { useParams } from "react-router-dom";

import { Alert } from "@/components/utility/Alert";
import productApi from "@/features/product/api";
import ProductListSection from "@/features/product/components/productListSection";

function ProductsByTagPage() {
  const { tag } = useParams();

  if (tag == null) {
    return <Alert type="error">ژانر مورد نظر یافت نشد</Alert>;
  }

  return (
    <ProductListSection
      getAllMethod={(query) => productApi.getByTag({ query, tag })}
    />
  );
}

export default ProductsByTagPage;
