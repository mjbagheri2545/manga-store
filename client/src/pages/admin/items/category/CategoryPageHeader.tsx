import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import { Link } from "@/components/utility";
import PATH from "@/constants/path";

function CategoryPageHeader({ title }: PageHeaderProps) {
  return (
    <PageHeader title={title}>
      <Link to={PATH.admin.index("category")}>دسته بندی ها</Link>
    </PageHeader>
  );
}

export default CategoryPageHeader;
