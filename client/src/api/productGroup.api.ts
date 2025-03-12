import PATH from "@/constants/path";
import { TProductGroupsContext } from "@/contexts/ProductGroupsContext";
import { HTTP } from "@/lib/http";

export function getAllProductGroups() {
  return HTTP.get<TProductGroupsContext>(`${PATH.base.product}/product-groups`);
}
