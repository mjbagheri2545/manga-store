import UpdateProductStatusForm from "@/features/productStatus/components/UpdateProductStatusForm";

import AdminSection from "../../components/section";
import { ProductStatusPageHeader } from "./ProductStatusPageHeader";

function UpdateProductStatusPage() {
  return (
    <>
      <ProductStatusPageHeader title="به‌روزرسانی وضعیت محصول" />
      <AdminSection>
        <UpdateProductStatusForm />
      </AdminSection>
    </>
  );
}

export default UpdateProductStatusPage;
