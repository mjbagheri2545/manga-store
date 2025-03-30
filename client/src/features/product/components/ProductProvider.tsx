import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { Alert } from "@/components/utility";
import { ProductContext } from "@/contexts/ProductContext";

import productApi from "../api";

function ProductProvider({ children }: PropsWithChildren) {
  const { slug } = useParams();

  if (slug == null) {
    return <Alert type="error">هیچ محصولی با این آدرس اینترنتی یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => productApi.getBySlug({ slug })}
      apiMethodOptions={{ dependencies: [slug] }}
    >
      {(data) => (
        <ProductContext.Provider value={data}>
          {children}
        </ProductContext.Provider>
      )}
    </ApiComponent>
  );
}

export default ProductProvider;
