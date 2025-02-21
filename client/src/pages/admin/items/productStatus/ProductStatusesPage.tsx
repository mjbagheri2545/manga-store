import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ProductStatusTable from "@/features/productStatus/components/ProductStatusTable";

import AdminPageHeader from "../../components/PageHeader";
import AdminSection from "../../components/section";

function ProductStatusesPage() {
  return (
    <>
      <AdminPageHeader title="وضعیت های محصول">
        <Button isLinkComponent to={PATH.admin.create("productStatus")}>
          افزودن وضعیت محصول
        </Button>
      </AdminPageHeader>
      <AdminSection>
        <ProductStatusTable />
      </AdminSection>
    </>
  );
}

export default ProductStatusesPage;
