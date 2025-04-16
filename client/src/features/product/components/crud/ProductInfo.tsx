import { useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { EntityInfoList } from "@/components/ui/crud/entityInfo/EntityInfoList";
import { Alert, Button } from "@/components/utility";
import PATH from "@/constants/path";

import productApi, { GetProductByIdResponse } from "../../api";
import PRODUCT_INFO_ITEMS from "./ProductInfoItems";

function ProductInfo() {
  const { productId } = useParams();

  if (productId == null) {
    return <Alert type="error">آیدی محصول یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => productApi.getById({ id: productId })}
      apiMethodOptions={{ dependencies: [productId] }}
    >
      {(data) => <ProductInfoChildren {...data} />}
    </ApiComponent>
  );
}

export default ProductInfo;

function ProductInfoChildren({ product }: GetProductByIdResponse) {
  return (
    <>
      <EntityInfoList info={PRODUCT_INFO_ITEMS} entity={product} />
      <div className="flex gap-x-6 gap-y-4 mt-6 flex-wrap w-full">
        <Button
          isLinkComponent
          to={PATH.admin.update("product", product.id)}
          className="lg:flex-1 max-lg:w-full"
        >
          به‌روزرسانی
        </Button>
        <Button
          isLinkComponent
          to={PATH.chapter.admin.index(product.id)}
          className="md:flex-1 max-md:w-full"
        >
          فصل های این محصول
        </Button>
        <Button
          isLinkComponent
          to={PATH.productComment.admin.index(product.id)}
          className="md:flex-1 max-md:w-full"
        >
          دیدگاه های این محصول
        </Button>
      </div>
    </>
  );
}
