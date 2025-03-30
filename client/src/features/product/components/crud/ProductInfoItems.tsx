import {
  CalendarIcon,
  CalendarPlusIcon,
  DollarSignIcon,
  IdCardIcon,
  LinkIcon,
  NotebookPenIcon,
  NotebookTextIcon,
  SquareMousePointerIcon,
  UserCircleIcon,
} from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import TextWithIcon from "@/components/ui/TextWithIcon";
import { Image } from "@/components/utility";
import { Product } from "@/types";
import { NUMBER_FORMATTER } from "@/utils";

const PRODUCT_INFO_ITEMS = {
  productImage: {
    renderItem: (productImage: string) => (
      <div className="col-span-full flex mb-4">
        <Image
          className="mx-auto w-full max-w-sm max-md:max-w-xs"
          src={productImage}
          alt="تصویر محصول"
        />
      </div>
    ),
  },
  id: {
    keyName: "آیدی کاربر",
    Icon: IdCardIcon,
  },
  name: {
    keyName: "نام",
    Icon: UserCircleIcon,
  },
  persianName: {
    keyName: "نام فارسی",
    Icon: UserCircleIcon,
  },
  slug: {
    keyName: "آدرس اینترنتی",
    Icon: LinkIcon,
  },
  designer: {
    keyName: "طراح",
    Icon: SquareMousePointerIcon,
  },
  writer: {
    keyName: "نویسنده",
    Icon: NotebookPenIcon,
  },
  releaseYear: {
    keyName: "سال انتشار",
    Icon: CalendarIcon,
  },
  oneChapterPriceInToman: {
    renderItem: (oneChapterPriceInToman: number) => (
      <TextWithIcon Icon={DollarSignIcon}>
        قیمت هر فصل: {NUMBER_FORMATTER.format(oneChapterPriceInToman)} تومان
      </TextWithIcon>
    ),
  },
  createdAt: {
    renderItem: (createdAt: string) => (
      <TextWithIcon Icon={CalendarPlusIcon}>
        زمان ایجاد: {new Date(createdAt).toLocaleString("fa")}
      </TextWithIcon>
    ),
  },
  summary: {
    renderItem: (summary: string) => (
      <TextWithIcon Icon={NotebookTextIcon} className="col-span-full">
        <p className="flex-1">خلاصه: {summary}</p>
      </TextWithIcon>
    ),
  },
} as TEntityInfo<Product>;

export default PRODUCT_INFO_ITEMS;
