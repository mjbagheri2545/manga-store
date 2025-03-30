import productApi from "@/features/product/api";
import ProductsListSection from "@/features/product/components/productsListSection";

function ProductsPage() {
  return (
    <ProductsListSection title="همه محصولات" getAllMethod={productApi.getAll} />
  );
}

export default ProductsPage;
