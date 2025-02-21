import { Link } from "@/components/utility";
import PATH from "@/constants/path";

import AdminPageHeader, {
  AdminPageHeaderProps,
} from "../../components/PageHeader";

export function ProductStatusPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <AdminPageHeader title={title}>
      <Link to={PATH.admin.index("productStatus")}>وضعیت های محصول</Link>
    </AdminPageHeader>
  );
}
