import { Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ProductStatusesTable from "@/features/productStatus/components/ProductStatusesTable";

import AdminPageHeader from "../../components/PageHeader";

function ProductStatusesPage() {
  return (
    <>
      <AdminPageHeader title="وضعیت های محصول">
        <Button isLinkComponent to={PATH.admin.create("productStatus")}>
          افزودن وضعیت محصول
        </Button>
      </AdminPageHeader>
      <Section>
        <ProductStatusesTable />
      </Section>
    </>
  );
}

export default ProductStatusesPage;
