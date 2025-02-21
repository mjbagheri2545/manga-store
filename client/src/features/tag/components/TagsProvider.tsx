import { PropsWithChildren } from "react";

import { ProductGroupProvider } from "@/components/ui/productGroup";

import tagApi from "../api";
import { TagsContext } from "../contexts";

function TagsProvider({ children }: PropsWithChildren) {
  return (
    <ProductGroupProvider
      Context={TagsContext}
      getAllMethod={tagApi.getAll}
      getEntitiesFromData={(result) => result.data.tags}
    >
      {children}
    </ProductGroupProvider>
  );
}

export default TagsProvider;
