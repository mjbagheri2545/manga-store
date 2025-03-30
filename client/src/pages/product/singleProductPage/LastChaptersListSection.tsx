import { Section, SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import { useProduct } from "@/contexts/ProductContext";
import ChapterList from "@/features/chapter/components/ChapterList";

function LastChaptersListSection() {
  const { product } = useProduct();

  return (
    <Section>
      <SectionTitle title="آخرین فصل ها">
        <LinkWithArrow to={PATH.product.productChapters(product.slug)}>
          همه فصل ها
        </LinkWithArrow>
      </SectionTitle>
      <ChapterList
        chapters={product.chapters}
        containerClassName="grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1"
      />
    </Section>
  );
}

export default LastChaptersListSection;
