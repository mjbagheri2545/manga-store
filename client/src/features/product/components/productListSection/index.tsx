import { useState } from "react";

import ApiComponent from "@/components/ui/ApiComponent";
import ApiErrorMessageList from "@/components/ui/ApiErrorMessageList";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import { Alert } from "@/components/utility/Alert";
import { GetAllProductResponse } from "@/features/product/api";
import ProductList from "@/features/product/components/ProductList";
import { useInfiniteApi } from "@/lib/api";
import { ApiMethod } from "@/types";

import { PRODUCTS_PAGE_QUERY_TAKE } from "../../constants/global";
import useProductQuery from "../../hooks/useProductQuery";
import { ProductQuery } from "../../types";
import ProductFilter from "./ProductFilter";

type ProductListWrapperProps = {
  getAllMethod: ApiMethod<GetAllProductResponse, ProductQuery | undefined>;
};

function ProductListWrapper({ getAllMethod }: ProductListWrapperProps) {
  const { sort, productStatus, productName } = useProductQuery();

  return (
    <ApiComponent
      apiMethod={() =>
        getAllMethod({
          skip: 0,
          take: PRODUCTS_PAGE_QUERY_TAKE,
          sort,
          status: productStatus,
          name: productName,
        })
      }
    >
      {(result) => (
        <ProductListWrapperChildren
          data={result.data}
          getAllMethod={getAllMethod}
        />
      )}
    </ApiComponent>
  );
}

export default ProductListWrapper;

type ProductListWrapperChildrenProps = ProductListWrapperProps & {
  data: GetAllProductResponse;
};

function ProductListWrapperChildren({
  data,
  getAllMethod,
}: ProductListWrapperChildrenProps) {
  const [products, setProducts] = useState(data.products);
  const { sort, productStatus, productName } = useProductQuery();

  const { error, hasMore, loadMoreEntities, status } = useInfiniteApi({
    entitiesLength: products.length,
    getAll: (paginateQuery) =>
      getAllMethod({
        skip: paginateQuery?.skip,
        take: PRODUCTS_PAGE_QUERY_TAKE,
        status: productStatus,
        sort,
        name: productName,
      }),
    initialTotalCount: data.count,
    onSuccess: (data) => {
      setProducts((current) => [...current, ...data.products]);
    },
  });

  if (data.count === 0) {
    return (
      <Alert type="info" containerProps={{ className: "text-lg" }}>
        هیج محصولی یافت نشد
      </Alert>
    );
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <ProductFilter />
      <ProductList products={products} />
      {status === "error" && (
        <ApiErrorMessageList
          error={error}
          messageListItemProps={{ containerProps: { className: "mt-4" } }}
        />
      )}
      {status === "pending" && (
        <SpinnerContainer containerProps={{ className: "mt-4" }} />
      )}
      {hasMore && (
        <LoadMoreButton
          buttonProps={{
            onClick: loadMoreEntities,
            isLoading: status === "pending",
          }}
        />
      )}
    </section>
  );
}
