import { Section, SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import { useProduct } from "@/contexts/ProductContext";
import CreateProductCommentForm from "@/features/productComment/components/crud/CreateProductCommentForm";
import RootProductCommentsList from "@/features/productComment/components/productCommentsList/RootProductCommentsList";
import RootProductCommentsProvider from "@/features/productComment/components/RootProductCommentsProvider";

function LastCommentsListSection() {
  const product = useProduct();

  return (
    <RootProductCommentsProvider rootProductComments={product.comments}>
      <Section>
        <CreateProductCommentForm />
      </Section>
      <Section containerProps={{ className: "bg-dark-body px-0" }}>
        <SectionTitle title="آخرین دیدگاه ها">
          <LinkWithArrow to={PATH.product.productComments(product.slug)}>
            همه دیدگاه ها
          </LinkWithArrow>
        </SectionTitle>
        <RootProductCommentsList />
      </Section>
    </RootProductCommentsProvider>
  );
}

export default LastCommentsListSection;
