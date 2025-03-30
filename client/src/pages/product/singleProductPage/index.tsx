import { SectionTitle } from "@/components/ui/layout";
import { useProduct } from "@/contexts/ProductContext";
import productApi from "@/features/product/api";
import ProductGeneralInfoSection from "@/features/product/components/productPageSections/productGeneralInfoSection";
import ProductsSliderSection from "@/features/product/components/ProductsSliderSection";

import LastChaptersListSection from "./LastChaptersListSection";
import MostTranslatedChaptersTranslatorsListSection from "./MostTranslatedChaptersTranslatorsListSection";

function SingleProductPage() {
  const { product } = useProduct();

  return (
    <>
      <ProductGeneralInfoSection />
      <LastChaptersListSection />
      <MostTranslatedChaptersTranslatorsListSection />
      <ProductsSliderSection
        getAllProducts={() => productApi.getRelatedProducts({ id: product.id })}
      >
        <SectionTitle title="محصولات مرتبط" />
      </ProductsSliderSection>
    </>
  );
}

export default SingleProductPage;
