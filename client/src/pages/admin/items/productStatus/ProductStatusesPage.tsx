import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ProductStatusesTable from "@/features/productStatus/components/ProductStatusesTable";

function ProductStatusesPage() {
  return (
    <>
      <PageHeader title="وضعیت های محصول">
        <Button isLinkComponent to={PATH.admin.create("productStatus")} isWide>
          افزودن وضعیت محصول
        </Button>
      </PageHeader>
      <Section>
        <ProductStatusesTable />
      </Section>
    </>
  );
}

export default ProductStatusesPage;
