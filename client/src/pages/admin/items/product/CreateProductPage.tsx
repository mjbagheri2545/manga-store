import { Section } from "@/components/ui/layout";
import { ProductGroupsProvider } from "@/components/ui/productGroup";
import ProgressProvider from "@/components/ui/ProgressProvider";
import CreateProductForm from "@/features/product/components/crud/CreateProductForm";

import ProductPageHeader from "./ProductPageHeader";

function CreateProductPage() {
  return (
    <>
      <ProductPageHeader title="افزودن محصول جدید" />
      <Section>
        <ProductGroupsProvider>
          <ProgressProvider>
            <CreateProductForm />
          </ProgressProvider>
        </ProductGroupsProvider>
      </Section>
    </>
  );
}

export default CreateProductPage;
