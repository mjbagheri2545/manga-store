import { PageHeader, Section } from "@/components/ui/layout";
import ProductCommentsTable from "@/features/productComment/components/crud/ProductCommentsTable";

function AdminProductCommentsPage() {
  return (
    <>
      <PageHeader title="دیدگاه ها" />
      <Section>
        <ProductCommentsTable />
      </Section>
    </>
  );
}

export default AdminProductCommentsPage;
