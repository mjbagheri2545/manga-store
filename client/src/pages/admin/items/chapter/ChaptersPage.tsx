import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ChaptersTable from "@/features/chapter/components/crud/ChaptersTable";
import useProductId from "@/hooks/features/useProductId";

import ImportantText from "../../components/ImportantText";

function ChaptersPage() {
  const productId = useProductId();
  return (
    <>
      <ImportantText />
      <PageHeader title="فصل ها">
        <Button
          isLinkComponent
          to={PATH.chapter.admin.create(productId)}
          isWide
        >
          افزودن فصل
        </Button>
      </PageHeader>
      <Section>
        <ChaptersTable />
      </Section>
    </>
  );
}

export default ChaptersPage;
