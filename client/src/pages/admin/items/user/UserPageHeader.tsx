import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";

function UserPageHeader({ title }: PageHeaderProps) {
  return (
    <PageHeader title={title}>
      <LinkWithArrow to={PATH.admin.index("user")}>کاربر ها</LinkWithArrow>
    </PageHeader>
  );
}

export default UserPageHeader;
