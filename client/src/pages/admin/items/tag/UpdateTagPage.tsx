import UpdateTagForm from "@/features/tag/components/UpdateTagForm";

import AdminSection from "../../components/section";
import { TagPageHeader } from "./TagPageHeader";

function UpdateTagPage() {
  return (
    <>
      <TagPageHeader title="به‌روزرسانی ژانر" />
      <AdminSection>
        <UpdateTagForm />
      </AdminSection>
    </>
  );
}

export default UpdateTagPage;
