import { PageHeader, Section } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import ProductCommentInfo from "@/features/productComment/components/crud/ProductCommentInfo";

function ProductCommentInfoPage() {
  return (
    <>
      <PageHeader title="اطلاعات دیدگاه">
        <LinkWithArrow to={PATH.admin.index("productComment")}>
          دیدگاه ها
        </LinkWithArrow>
      </PageHeader>
      <Section>
        <ProductCommentInfo />
      </Section>
    </>
  );
}

export default ProductCommentInfoPage;
