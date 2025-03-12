import {
  CalendarIcon,
  CalendarPlusIcon,
  DollarSignIcon,
  LinkIcon,
  NotebookPenIcon,
  NotebookTextIcon,
  SquareMousePointerIcon,
  UserCircleIcon,
} from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import Image from "@/components/utility/Image";
import { Product } from "@/types";

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
  priceInRials: {
    keyName: "قیمت به ریال",
    Icon: DollarSignIcon,
  },
  createdAt: {
    keyName: "زمان ایجاد",
    Icon: CalendarPlusIcon,
    renderItem: (createdAt: string) => (
      <span className="block">
        زمان ایجاد: {new Date(createdAt).toLocaleString("fa")}
      </span>
    ),
  },
  summary: {
    keyName: "خلاصه",
    Icon: NotebookTextIcon,
    renderItem: (summary: string) => (
      <div className="col-span-full">
        <p>خلاصه: {summary}</p>
      </div>
    ),
  },
} as TEntityInfo<Product>;

export default PRODUCT_INFO_ITEMS;
