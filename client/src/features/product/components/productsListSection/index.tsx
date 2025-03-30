import { useState } from "react";

import { ApiErrorMessageList } from "@/components/ui/api";
import { Section, SectionTitle } from "@/components/ui/layout";
import { Pagination } from "@/components/ui/Pagination";
import { SpinnerContainer } from "@/components/ui/SpinnerContainer";
import { Alert } from "@/components/utility";
import {
  GetAllProductBase,
  GetAllProductsResponse,
} from "@/features/product/api";
import ProductList from "@/features/product/components/ProductsList";
import { usePagination } from "@/lib/api";
import { ApiMethod } from "@/types";

import { PRODUCTS_QUERY_TAKE } from "../../constants/global";
import useProductQuery from "../../hooks/useProductQuery";
import { ProductQuery } from "../../types";
import ProductFilter from "./ProductsFilter";

type ProductsListSectionProps = {
  getAllMethod: ApiMethod<GetAllProductsResponse, ProductQuery | undefined>;
  title: string;
};

function ProductsListSection({
  getAllMethod,
  title,
}: ProductsListSectionProps) {
  const [products, setProducts] = useState<GetAllProductBase[]>([]);
  const { sort, productStatus, productName } = useProductQuery();

  const { error, status, ...pageState } = usePagination({
    getAllMethod: (paginateQuery) =>
      getAllMethod({
        ...paginateQuery,
        status: productStatus,
        sort,
        name: productName,
      }),
    take: PRODUCTS_QUERY_TAKE,
    onSuccess: (data) => setProducts(data.products),
  });

  if (status !== "idle" && status !== "error" && products.length === 0) {
    return (
      <>
        <Alert type="info" containerProps={{ className: "text-lg" }}>
          هیج محصولی یافت نشد
        </Alert>
        <Pagination
          {...pageState}
          buttonProps={{ className: "bg-dark hover:bg-slate-50/15" }}
        />
      </>
    );
  }

  return (
    <>
      <ProductFilter />
      <Section containerProps={{ className: "bg-dark-body" }}>
        <SectionTitle title={title} />

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
        <Pagination
          {...pageState}
          buttonProps={{ className: "bg-dark hover:bg-slate-50/15" }}
        />
      </Section>
    </>
  );
}

export default ProductsListSection;
