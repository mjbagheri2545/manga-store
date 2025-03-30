import { Section } from "@/components/ui/layout";
import ChapterInfo from "@/features/chapter/components/crud/ChapterInfo";

import ChapterPageHeader from "./ChapterPageHeader";

function ChapterInfoPage() {
  return (
    <>
      <ChapterPageHeader title="اطلاعات فصل" />
      <Section>
        <ChapterInfo />
      </Section>
    </>
  );
}

export default ChapterInfoPage;
