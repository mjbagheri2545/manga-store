import { useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { EntityInfoList } from "@/components/ui/crud/entityInfo/EntityInfoList";
import { Alert, Button } from "@/components/utility";
import PATH from "@/constants/path";
import useProductId from "@/hooks/features/useProductId";

import chapterApi, { ChapterResponse } from "../../api";
import CHAPTER_INFO_ITEMS from "./ChapterInfoItems";

function ChapterInfo() {
  const { chapterId } = useParams();
  const productId = useProductId();

  if (chapterId == null) {
    return <Alert type="error">آیدی فصل یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => chapterApi.getById({ id: chapterId, productId })}
      apiMethodOptions={{ dependencies: [chapterId] }}
    >
      {(data) => <ChapterInfoChildren {...data} />}
    </ApiComponent>
  );
}

export default ChapterInfo;

function ChapterInfoChildren({ chapter }: ChapterResponse) {
  const productId = useProductId();

  return (
    <>
      <EntityInfoList info={CHAPTER_INFO_ITEMS} entity={chapter} />
      <Button
        isLinkComponent
        to={PATH.chapter.admin.edit(productId, chapter.id)}
        isWide
        className="mt-6"
      >
        به‌روزرسانی
      </Button>
    </>
  );
}
