import { Link } from "@/components/utility";
import PATH from "@/constants/path";
import AdminPageHeader, {
  AdminPageHeaderProps,
} from "@/pages/admin/components/PageHeader";

function ProductPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <AdminPageHeader title={title}>
      <Link to={PATH.admin.index("product")}>محصول ها</Link>
    </AdminPageHeader>
  );
}

export default ProductPageHeader;
