import { ApiIdComponent } from "@/components/ui/api";
import { Section } from "@/components/ui/layout";
import { ProductGroupsProvider } from "@/components/ui/productGroup";
import ProgressProvider from "@/components/ui/ProgressProvider";
import productApi from "@/features/product/api";
import UpdateProductForm from "@/features/product/components/crud/UpdateProductForm";

import ProductPageHeader from "./ProductPageHeader";

function UpdateProductPage() {
  return (
    <>
      <ProductPageHeader title="به‌روزرسانی محصول" />
      <Section>
        <ProductGroupsProvider>
          <ApiIdComponent entityName="محصول" getByIdMethod={productApi.getById}>
            {(data) => (
              <ProgressProvider>
                <UpdateProductForm {...data} />
              </ProgressProvider>
            )}
          </ApiIdComponent>
        </ProductGroupsProvider>
      </Section>
    </>
  );
}

export default UpdateProductPage;
