import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import { useProduct } from "@/contexts/ProductContext";

function SingleProductLink() {
  const product = useProduct();
  return (
    <LinkWithArrow to={PATH.product.singleProduct(product.slug)}>
      {product.name}
    </LinkWithArrow>
  );
}

export default SingleProductLink;
