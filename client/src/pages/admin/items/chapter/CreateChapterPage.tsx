import { Section } from "@/components/ui/layout";
import ProgressProvider from "@/components/ui/ProgressProvider";
import CreateChapterForm from "@/features/chapter/components/crud/CreateChapterForm";

import ChapterPageHeader from "./ChapterPageHeader";

function CreateChapterPage() {
  return (
    <>
      <ChapterPageHeader title="افزودن فصل جدید" />
      <Section>
        <ProgressProvider>
          <CreateChapterForm />
        </ProgressProvider>
      </Section>
    </>
  );
}

export default CreateChapterPage;
