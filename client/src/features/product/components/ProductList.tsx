import { GetAllProductBase } from "../api";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: GetAllProductBase[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex-1 w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
