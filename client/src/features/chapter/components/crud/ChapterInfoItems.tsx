import {
  CalendarPlusIcon,
  FileDigitIcon,
  FileTextIcon,
  IdCardIcon,
} from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import TextWithIcon from "@/components/ui/TextWithIcon";
import { Chapter } from "@/types";

const CHAPTER_INFO_ITEMS = {
  id: {
    keyName: "آیدی فصل",
    Icon: IdCardIcon,
  },
  episode: {
    keyName: "قسمت",
    Icon: FileDigitIcon,
  },
  createdAt: {
    renderItem: (createdAt: string) => (
      <TextWithIcon Icon={CalendarPlusIcon}>
        زمان ایجاد: {new Date(createdAt).toLocaleString("fa")}
      </TextWithIcon>
    ),
  },
  chapterFile: {
    keyName: "فایل فصل",
    Icon: FileTextIcon,
  },
} as TEntityInfo<Chapter>;

export default CHAPTER_INFO_ITEMS;
