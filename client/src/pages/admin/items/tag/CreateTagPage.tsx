import { Section } from "@/components/ui/layout";
import CreateTagForm from "@/features/tag/components/CreateTagForm";

import TagPageHeader from "./TagPageHeader";

function CreateTagPage() {
  return (
    <>
      <TagPageHeader title="افزودن ژانر جدید" />
      <Section>
        <CreateTagForm />
      </Section>
    </>
  );
}

export default CreateTagPage;
