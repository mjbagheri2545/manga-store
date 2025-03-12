import { Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ProductsTable from "@/features/product/components/crud/ProductsTable";
import AdminPageHeader from "@/pages/admin/components/PageHeader";

function ProductsPage() {
  return (
    <>
      <AdminPageHeader title="محصول ها">
        <Button isLinkComponent to={PATH.admin.create("product")}>
          افزودن محصول
        </Button>
      </AdminPageHeader>
      <Section>
        <ProductsTable />
      </Section>
    </>
  );
}

export default ProductsPage;
