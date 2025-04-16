import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ProductsTable from "@/features/product/components/crud/ProductsTable";

import ImportantText from "../../components/ImportantText";

function ProductsPage() {
  return (
    <>
      <ImportantText />
      <PageHeader title="محصول ها">
        <Button isLinkComponent to={PATH.admin.create("product")} isWide>
          افزودن محصول
        </Button>
      </PageHeader>
      <Section>
        <ProductsTable />
      </Section>
    </>
  );
}

export default ProductsPage;
