import { Section } from "@/components/ui/layout";
import CreateProductStatusForm from "@/features/productStatus/components/CreateProductStatusForm";

import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function CreateProductStatusPage() {
  return (
    <>
      <ProductStatusPageHeader title="افزودن وضعیت محصول جدید" />
      <Section>
        <CreateProductStatusForm />
      </Section>
    </>
  );
}

export default CreateProductStatusPage;
