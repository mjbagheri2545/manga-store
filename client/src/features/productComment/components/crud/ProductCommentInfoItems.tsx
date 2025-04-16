import {
  CalendarPlusIcon,
  IdCardIcon,
  MessageSquareTextIcon,
} from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import TextWithIcon from "@/components/ui/TextWithIcon";
import { ProductComment } from "@/types";

const PRODUCT_COMMENT_INFO_ITEMS = {
  id: {
    keyName: "آیدی دیدگاه",
    Icon: IdCardIcon,
  },
  createdAt: {
    renderItem: (createdAt: string) => (
      <TextWithIcon Icon={CalendarPlusIcon}>
        زمان ایجاد: {new Date(createdAt).toLocaleString("fa")}
      </TextWithIcon>
    ),
  },
  updatedAt: {
    renderItem: (updatedAt: string) => (
      <TextWithIcon Icon={CalendarPlusIcon}>
        زمان آخرین به‌روزرسانی: {new Date(updatedAt).toLocaleString("fa")}
      </TextWithIcon>
    ),
  },
  message: {
    renderItem: (message: string) => (
      <TextWithIcon Icon={MessageSquareTextIcon}>پیام: {message}</TextWithIcon>
    ),
  },
} as TEntityInfo<ProductComment>;

export default PRODUCT_COMMENT_INFO_ITEMS;
