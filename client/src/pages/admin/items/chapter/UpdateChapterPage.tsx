import { Section } from "@/components/ui/layout";
import ProgressProvider from "@/components/ui/ProgressProvider";
import UpdateChapterForm from "@/features/chapter/components/crud/UpdateChapterForm";

import ChapterPageHeader from "./ChapterPageHeader";

function UpdateChapterPage() {
  return (
    <>
      <ChapterPageHeader title="به‌روزرسانی فصل" />
      <Section>
        <ProgressProvider>
          <UpdateChapterForm />
        </ProgressProvider>
      </Section>
    </>
  );
}

export default UpdateChapterPage;
