import { FormState } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { CrudForm } from "@/components/ui/crud";
import { Alert } from "@/components/utility";
import SHARED_MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import { useProgress } from "@/contexts/ProgressContext";
import {
  createOnUploadProgress,
  getUpdatedFields,
  parseApiResponse,
} from "@/utils";

import chapterApi, { ChapterResponse, GetTranslatorsResponse } from "../../api";
import useChapterPageParams from "../../hooks/useChapterPageParams";
import { UpdateChapterData, updateChapterSchema } from "../../schemas";
import ChapterFormFields from "./ChapterFormFields";

function UpdateChapterForm() {
  const { chapterId } = useParams();
  const { productId } = useChapterPageParams();

  if (chapterId == null) {
    return <Alert type="error">آیدی فصل یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => chapterApi.getById({ id: chapterId, productId })}
      apiMethodOptions={{ dependencies: [chapterId] }}
    >
      {({ chapter }) => (
        <ApiComponent apiMethod={chapterApi.getTranslators}>
          {({ translators }) => (
            <UpdateChapterFormChildren
              chapter={chapter}
              translators={translators}
            />
          )}
        </ApiComponent>
      )}
    </ApiComponent>
  );
}

export default UpdateChapterForm;

type UpdateChapterFormChildrenProps = {
  translators: GetTranslatorsResponse["translators"];
  chapter: ChapterResponse["chapter"];
};

function UpdateChapterFormChildren({
  translators,
  chapter,
}: UpdateChapterFormChildrenProps) {
  const navigate = useNavigate();
  const { productId } = useChapterPageParams();
  const { setProgress } = useProgress();

  async function handleOnSubmit(
    data: UpdateChapterData,
    formState: FormState<UpdateChapterData>
  ) {
    const dataToUpdate = getUpdatedFields(data, formState);

    if (Object.keys(dataToUpdate).length === 0) {
      toast.error(SHARED_MESSAGES.general.noFieldUpdated);
      return;
    }

    const response = await chapterApi.update({
      id: chapter.id,
      data: dataToUpdate,
      onUploadProgress: createOnUploadProgress(setProgress),
      productId,
    });

    parseApiResponse(response, () => {
      navigate(PATH.chapter.admin.info(productId, chapter.id));
    });
  }

  return (
    <CrudForm
      handleOnSubmit={handleOnSubmit}
      submitButton="به‌روزرسانی فصل"
      useFormProps={{
        defaultValues: {
          episode: chapter.episode,
          translatorId: chapter.translator.id,
        },
      }}
      schema={updateChapterSchema}
    >
      <ChapterFormFields translators={translators} chapter={chapter} />
    </CrudForm>
  );
}
