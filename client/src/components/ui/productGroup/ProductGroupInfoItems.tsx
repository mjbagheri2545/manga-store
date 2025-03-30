import { CircleUserRoundIcon, IdCardIcon, LinkIcon } from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import { ProductGroup } from "@/types";

export const PRODUCT_GROUP_INFO_ITEMS = {
  id: {
    keyName: "آیدی کاربر",
    Icon: IdCardIcon,
  },
  name: {
    keyName: "اسم",
    Icon: CircleUserRoundIcon,
  },
  slug: {
    keyName: "آدرس اینترنتی",
    Icon: LinkIcon,
  },
} as TEntityInfo<ProductGroup>;
