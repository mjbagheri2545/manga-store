import { useParams } from "react-router-dom";

import { Alert } from "@/components/utility";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import productApi from "@/features/product/api";
import ProductsListSection from "@/features/product/components/productsListSection";

function ProductsByTagPage() {
  const { tag } = useParams();
  const { tags } = useProductGroups();

  if (tag == null) {
    return <Alert type="error">ژانر مورد نظر یافت نشد</Alert>;
  }

  const fullTag = tags.find((item) => item.slug === tag);

  return (
    <ProductsListSection
      title={fullTag!.name}
      getAllMethod={(query) => productApi.getByTag({ query, tag })}
    />
  );
}

export default ProductsByTagPage;
