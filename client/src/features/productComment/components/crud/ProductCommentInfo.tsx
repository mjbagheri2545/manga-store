import { useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { EntityInfoList } from "@/components/ui/crud/entityInfo/EntityInfoList";
import { Alert } from "@/components/utility";
import useProductId from "@/hooks/features/useProductId";

import productCommentApi from "../../api";
import PRODUCT_COMMENT_INFO_ITEMS from "./ProductCommentInfoItems";

function ProductCommentInfo() {
  const { productCommentId } = useParams();
  const productId = useProductId();

  if (productCommentId == null) {
    return <Alert type="error">آیدی دیدگاه یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() =>
        productCommentApi.getById({ id: productCommentId, productId })
      }
      apiMethodOptions={{ dependencies: [productCommentId] }}
    >
      {({ productComment }) => (
        <EntityInfoList
          info={PRODUCT_COMMENT_INFO_ITEMS}
          entity={productComment}
        />
      )}
    </ApiComponent>
  );
}

export default ProductCommentInfo;
