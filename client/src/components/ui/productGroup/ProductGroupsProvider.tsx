import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { getAllProductGroups } from "@/api/productGroup.api";
import PATH from "@/constants/path";
import { ProductGroupsContext } from "@/contexts/ProductGroupsContext";
import { useApi } from "@/lib/api";
import { toastApiResponseError } from "@/utils";

import { SpinnerContainer } from "../SpinnerContainer";

export function ProductGroupsProvider({ children }: PropsWithChildren) {
  const { error, result, status } = useApi(getAllProductGroups);

  if (status === "pending") {
    return <SpinnerContainer />;
  }

  if (status === "error") {
    toastApiResponseError(error);
    return <Navigate to={PATH.auth.login} replace />;
  }

  return (
    <ProductGroupsContext.Provider value={result.data}>
      {children}
    </ProductGroupsContext.Provider>
  );
}
