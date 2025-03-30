import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import ChaptersTable from "@/features/chapter/components/crud/ChaptersTable";

import useChapterPageParams from "../../../../features/chapter/hooks/useChapterPageParams";

function ChaptersPage() {
  const { productId } = useChapterPageParams();
  return (
    <>
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
