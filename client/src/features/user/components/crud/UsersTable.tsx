import { CircleCheckIcon, XCircleIcon } from "lucide-react";

import { CrudTable } from "@/components/ui/crud";
import { TableColumn } from "@/components/utility/table";
import { NUMBER_FORMATTER } from "@/utils";

import userCrudApi, { GetAllUserBase } from "../../api/crud.api";

const userTableColumns = [
  { key: "fullName", title: "نام و نام خانوادگی" },
  { key: "email", title: "ایمیل" },
  {
    key: "isVerified",
    title: "وضعیت تأیید حساب",
    render: (isVerified: boolean) =>
      isVerified ? (
        <CircleCheckIcon className="text-success" />
      ) : (
        <XCircleIcon className="text-error" />
      ),
  },
  {
    key: "createdAt",
    title: "تاریخ عضویت",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString("fa"),
  },
  {
    key: "walletBalanceInToman",
    title: "موجودی کیف پول",
    render: (walletBalanceInToman: number) =>
      `${NUMBER_FORMATTER.format(walletBalanceInToman)} تومان`,
  },
] as TableColumn<GetAllUserBase>[];

function UsersTable() {
  return (
    <CrudTable
      api={userCrudApi}
      entityKey="user"
      getEntitiesFromData={(data) => data.users}
      columns={userTableColumns}
    />
  );
}

export default UsersTable;
