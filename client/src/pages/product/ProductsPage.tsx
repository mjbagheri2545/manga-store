import productApi from "@/features/product/api";
import ProductListSection from "@/features/product/components/productListSection";

function ProductsPage() {
  return <ProductListSection getAllMethod={productApi.getAll} />;
}

export default ProductsPage;
