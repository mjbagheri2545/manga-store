import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";

export function ProductStatusPageHeader({ title }: PageHeaderProps) {
  return (
    <PageHeader title={title}>
      <LinkWithArrow to={PATH.admin.index("productStatus")}>
        وضعیت های محصول
      </LinkWithArrow>
    </PageHeader>
  );
}
