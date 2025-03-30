import { Section, SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import { useProduct } from "@/contexts/ProductContext";
import TranslatorsList from "@/features/product/components/translators/TranslatorsList";

function MostTranslatedChaptersTranslatorsListSection() {
  const { product } = useProduct();
  return (
    <Section>
      <SectionTitle title="مترجم ها">
        <LinkWithArrow to={PATH.product.productTranslators(product.slug)}>
          همه مترجم ها
        </LinkWithArrow>
      </SectionTitle>
      <TranslatorsList translators={product.translators} />
    </Section>
  );
}

export default MostTranslatedChaptersTranslatorsListSection;
