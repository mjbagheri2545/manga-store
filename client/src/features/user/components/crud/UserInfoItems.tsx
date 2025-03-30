import {
  CalendarPlusIcon,
  IdCardIcon,
  MailIcon,
  NotebookTextIcon,
  UserCircleIcon,
  WalletIcon,
} from "lucide-react";

import { TEntityInfo } from "@/components/ui/crud";
import TextWithIcon from "@/components/ui/TextWithIcon";
import { Image } from "@/components/utility";
import { User } from "@/types";

const USER_INFO_ITEMS = {
  avatarImage: {
    renderItem: (avatarImage: string) => (
      <div className="col-span-full flex mb-4">
        <Image
          className="mx-auto w-full max-w-sm max-md:max-w-xs"
          src={avatarImage}
          alt="تصویر پروفایل"
        />
      </div>
    ),
  },
  id: {
    keyName: "آیدی کاربر",
    Icon: IdCardIcon,
  },
  fullName: {
    keyName: "نام و نام خانوادگی",
    Icon: UserCircleIcon,
  },
  email: {
    keyName: "ایمیل",
    Icon: MailIcon,
  },
  walletBalanceInToman: {
    keyName: "موجودی کیف پول",
    Icon: WalletIcon,
  },
  createdAt: {
    renderItem: (createdAt: string) => (
      <TextWithIcon Icon={CalendarPlusIcon}>
        زمان عضویت: {new Date(createdAt).toLocaleString("fa")}
      </TextWithIcon>
    ),
  },
  bio: {
    renderItem: (bio: string) =>
      bio.length > 0 && (
        <TextWithIcon Icon={NotebookTextIcon} className="col-span-full">
          <p className="flex-1">بیوگرافی: {bio}</p>
        </TextWithIcon>
      ),
  },
} as TEntityInfo<User>;

export default USER_INFO_ITEMS;
