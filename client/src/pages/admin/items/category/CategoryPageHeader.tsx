import { Link } from "@/components/utility";
import PATH from "@/constants/path";

import AdminPageHeader, {
  AdminPageHeaderProps,
} from "../../components/PageHeader";

export function CategoryPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <AdminPageHeader title={title}>
      <Link to={PATH.admin.index("category")}>دسته بندی ها</Link>
    </AdminPageHeader>
  );
}
