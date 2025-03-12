import { useSearchParams } from "react-router-dom";

function useProductQuery() {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get("sort") ?? undefined;
  const productStatus = searchParams.get("status") ?? undefined;
  const productName = searchParams.get("productName") ?? undefined;

  return { sort, productStatus, productName };
}

export default useProductQuery;
