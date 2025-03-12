import { Section } from "@/components/ui/layout";
import { ProductGroupsProvider } from "@/components/ui/productGroup";
import ProgressProvider from "@/components/ui/ProgressProvider";
import UpdateProductForm from "@/features/product/components/crud/UpdateProductForm";

import ProductPageHeader from "./ProductPageHeader";

function UpdateProductPage() {
  return (
    <>
      <ProductPageHeader title="به‌روزرسانی محصول" />
      <Section>
        <ProductGroupsProvider>
          <ProgressProvider>
            <UpdateProductForm />
          </ProgressProvider>
        </ProductGroupsProvider>
      </Section>
    </>
  );
}

export default UpdateProductPage;
