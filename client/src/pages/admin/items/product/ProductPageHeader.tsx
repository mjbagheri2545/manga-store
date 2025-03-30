import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";

function ProductPageHeader({ title }: PageHeaderProps) {
  return (
    <PageHeader title={title}>
      <LinkWithArrow to={PATH.admin.index("product")}>محصول ها</LinkWithArrow>
    </PageHeader>
  );
}

export default ProductPageHeader;
