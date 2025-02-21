import {
  BellIcon,
  ClipboardListIcon,
  ClipboardPenIcon,
  FolderIcon,
  HourglassIcon,
  ScrollTextIcon,
  SettingsIcon,
  TagIcon,
  TicketsIcon,
  UserRoundPenIcon,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "مدیریت محصولات",
    Icon: ClipboardListIcon,
    to: "products",
  },
  {
    title: "مدیریت کاربران",
    Icon: UserRoundPenIcon,
    to: "users",
  },
  {
    title: "مدیریت دسته بندی ها",
    Icon: FolderIcon,
    to: "categories",
  },
  {
    title: "مدیریت ژانر ها",
    Icon: TagIcon,
    to: "tags",
  },
  {
    title: "مدیریت وضعیت های محصول",
    Icon: HourglassIcon,
    to: "product-statuses",
  },
  {
    title: "مدیریت سفارشات",
    Icon: ClipboardPenIcon,
    to: "orders",
  },
  {
    title: "مدیریت اعلانات",
    Icon: BellIcon,
    to: "notifications",
  },
  {
    title: "مدیریت تیکت ها",
    Icon: TicketsIcon,
    to: "tickets",
  },
  {
    title: "گزارشات سایت",
    Icon: ScrollTextIcon,
    to: "reports",
  },
  {
    title: "تنظیمات",
    Icon: SettingsIcon,
    to: "settings",
  },
];
