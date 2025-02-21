import { Link } from "@/components/utility";
import PATH from "@/constants/path";

import AdminPageHeader, {
  AdminPageHeaderProps,
} from "../../components/PageHeader";

export function TagPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <AdminPageHeader title={title}>
      <Link to={PATH.admin.index("tag")}>ژانر ها</Link>
    </AdminPageHeader>
  );
}
