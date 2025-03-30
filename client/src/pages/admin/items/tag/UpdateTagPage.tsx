import { ApiIdComponent } from "@/components/ui/api";
import { Section } from "@/components/ui/layout";
import tagApi from "@/features/tag/api";
import UpdateTagForm from "@/features/tag/components/UpdateTagForm";

import TagPageHeader from "./TagPageHeader";

function UpdateTagPage() {
  return (
    <>
      <TagPageHeader title="به‌روزرسانی ژانر" />
      <Section>
        <ApiIdComponent getByIdMethod={tagApi.getById} entityName="ژانر">
          {(data) => <UpdateTagForm {...data} />}
        </ApiIdComponent>
      </Section>
    </>
  );
}

export default UpdateTagPage;
