import { CircleUserRoundIcon, LinkIcon } from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import { ProductGroup } from "@/types";

export const PRODUCT_GROUP_INFO_ITEMS = {
  name: {
    keyName: "اسم",
    Icon: CircleUserRoundIcon,
  },
  slug: {
    keyName: "آدرس اینترنتی",
    Icon: LinkIcon,
  },
} as TEntityInfo<ProductGroup>;
