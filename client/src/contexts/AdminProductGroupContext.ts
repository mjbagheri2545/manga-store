import { useContextValue } from "@/hooks";
import { ProductGroup } from "@/types";

import { createEntitiesContext } from "./EntitiesContext";

export const AdminProductGroupContext = createEntitiesContext<ProductGroup>();

export function useAdminProductGroup() {
  return useContextValue(AdminProductGroupContext);
}
