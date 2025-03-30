import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";

function TagPageHeader({ title }: PageHeaderProps) {
  return (
    <PageHeader title={title}>
      <LinkWithArrow to={PATH.admin.index("tag")}>ژانر ها</LinkWithArrow>
    </PageHeader>
  );
}

export default TagPageHeader;
