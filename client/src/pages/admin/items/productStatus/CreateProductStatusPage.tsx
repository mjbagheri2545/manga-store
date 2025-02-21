import CreateProductStatusForm from "@/features/productStatus/components/CreateProductStatusForm";

import AdminSection from "../../components/section";
import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function CreateProductStatusPage() {
  return (
    <>
      <ProductStatusPageHeader title="افزودن وضعیت محصول جدید" />
      <AdminSection>
        <CreateProductStatusForm />
      </AdminSection>
    </>
  );
}

export default CreateProductStatusPage;
