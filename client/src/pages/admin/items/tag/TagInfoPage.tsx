import TagInfo from "@/features/tag/components/TagInfo";

import AdminSection from "../../components/section";
import { TagPageHeader } from "./TagPageHeader";

function TagInfoPage() {
  return (
    <>
      <TagPageHeader title="اطلاعات ژانر" />
      <AdminSection>
        <TagInfo />
      </AdminSection>
    </>
  );
}

export default TagInfoPage;
