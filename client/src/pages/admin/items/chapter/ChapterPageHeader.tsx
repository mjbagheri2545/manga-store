import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import useProductId from "@/hooks/features/useProductId";

function ChapterPageHeader({ title }: PageHeaderProps) {
  const productId = useProductId();
  return (
    <PageHeader title={title}>
      <LinkWithArrow to={PATH.chapter.admin.index(productId)}>
        فصل ها
      </LinkWithArrow>
    </PageHeader>
  );
}

export default ChapterPageHeader;
