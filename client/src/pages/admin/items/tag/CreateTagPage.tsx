import CreateTagForm from "@/features/tag/components/CreateTagForm";

import AdminSection from "../../components/section";
import { TagPageHeader } from "./TagPageHeader";

function CreateTagPage() {
  return (
    <>
      <TagPageHeader title="افزودن ژانر جدید" />
      <AdminSection>
        <CreateTagForm />
      </AdminSection>
    </>
  );
}

export default CreateTagPage;
