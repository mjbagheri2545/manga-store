import { Section } from "@/components/ui/layout";
import UpdateProductStatusForm from "@/features/productStatus/components/UpdateProductStatusForm";

import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function UpdateProductStatusPage() {
  return (
    <>
      <ProductStatusPageHeader title="به‌روزرسانی وضعیت محصول" />
      <Section>
        <UpdateProductStatusForm />
      </Section>
    </>
  );
}

export default UpdateProductStatusPage;
