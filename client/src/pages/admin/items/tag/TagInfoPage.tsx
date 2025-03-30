import { Section } from "@/components/ui/layout";
import TagInfo from "@/features/tag/components/TagInfo";

import TagPageHeader from "./TagPageHeader";

function TagInfoPage() {
  return (
    <>
      <TagPageHeader title="اطلاعات ژانر" />
      <Section>
        <TagInfo />
      </Section>
    </>
  );
}

export default TagInfoPage;
