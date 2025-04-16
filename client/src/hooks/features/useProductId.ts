import { useParams } from "react-router-dom";

function useProductId() {
  const { productId } = useParams();

  // this should never happen
  if (productId == null) {
    throw new Error("آیدی محصول یافت نشد");
  }

  return productId;
}

export default useProductId;
