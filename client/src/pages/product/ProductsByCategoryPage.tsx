import { useParams } from "react-router-dom";

import { Alert } from "@/components/utility";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import productApi from "@/features/product/api";
import ProductsListSection from "@/features/product/components/productsListSection";

function ProductsByCategoryPage() {
  const { category } = useParams();

  const { categories } = useProductGroups();

  if (category == null) {
    return <Alert type="error">دسته بندی مورد نظر یافت نشد</Alert>;
  }

  const fullCategory = categories.find((item) => item.slug === category);

  return (
    <ProductsListSection
      title={fullCategory!.name}
      getAllMethod={(query) => productApi.getByCategory({ query, category })}
    />
  );
}

export default ProductsByCategoryPage;
