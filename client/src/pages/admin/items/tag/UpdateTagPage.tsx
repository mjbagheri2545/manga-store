import { Section } from "@/components/ui/layout";
import UpdateTagForm from "@/features/tag/components/UpdateTagForm";

import { TagPageHeader } from "./TagPageHeader";

function UpdateTagPage() {
  return (
    <>
      <TagPageHeader title="به‌روزرسانی ژانر" />
      <Section>
        <UpdateTagForm />
      </Section>
    </>
  );
}

export default UpdateTagPage;
