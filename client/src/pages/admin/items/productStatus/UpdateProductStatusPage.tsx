import { ApiIdComponent } from "@/components/ui/api";
import { Section } from "@/components/ui/layout";
import productStatusApi from "@/features/productStatus/api";
import UpdateProductStatusForm from "@/features/productStatus/components/UpdateProductStatusForm";

import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function UpdateProductStatusPage() {
  return (
    <>
      <ProductStatusPageHeader title="به‌روزرسانی وضعیت محصول" />
      <Section>
        <ApiIdComponent
          getByIdMethod={productStatusApi.getById}
          entityName="وضعیت محصول"
        >
          {(data) => <UpdateProductStatusForm {...data} />}
        </ApiIdComponent>
      </Section>
    </>
  );
}

export default UpdateProductStatusPage;
