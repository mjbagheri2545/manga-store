import { Outlet, useParams } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { Alert } from "@/components/utility";
import { ProductComment } from "@/types";

function ProductCommentPageWrapper() {
  const { productId } = useParams();

  if (productId == null) {
    return <Alert>آیدی محصول یافت نشد</Alert>;
  }

  return (
    <EntitiesProvider<ProductComment>>
      <Outlet />
    </EntitiesProvider>
  );
}

export default ProductCommentPageWrapper;
