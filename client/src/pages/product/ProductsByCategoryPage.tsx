import { useParams } from "react-router-dom";

import { Alert } from "@/components/utility/Alert";
import productApi from "@/features/product/api";
import ProductListSection from "@/features/product/components/productListSection";

function ProductsByCategoryPage() {
  const { category } = useParams();

  if (category == null) {
    return <Alert type="error">دسته بندی مورد نظر یافت نشد</Alert>;
  }

  return (
    <ProductListSection
      getAllMethod={(query) => {
        return productApi.getByCategory({ query, category });
      }}
    />
  );
}

export default ProductsByCategoryPage;
