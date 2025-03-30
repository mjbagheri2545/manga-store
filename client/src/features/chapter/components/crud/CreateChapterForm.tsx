import { useNavigate } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { CreateEntityForm } from "@/components/ui/form";
import PATH from "@/constants/path";
import { useProgress } from "@/contexts/ProgressContext";
import { createOnUploadProgress } from "@/utils";

import chapterApi, { GetTranslatorsResponse } from "../../api";
import useChapterPageParams from "../../hooks/useChapterPageParams";
import { createChapterSchema } from "../../schemas";
import ChapterFormFields from "./ChapterFormFields";

function CreateChapterForm() {
  return (
    <ApiComponent apiMethod={chapterApi.getTranslators}>
      {(data) => <CreateChapterFormChildren {...data} />}
    </ApiComponent>
  );
}

export default CreateChapterForm;

function CreateChapterFormChildren({ translators }: GetTranslatorsResponse) {
  const { setProgress } = useProgress();
  const { productId } = useChapterPageParams();
  const navigate = useNavigate();

  return (
    <CreateEntityForm
      createMethod={({ data }) =>
        chapterApi.create({
          data,
          productId,
          onUploadProgress: createOnUploadProgress(setProgress),
        })
      }
      entityKey="chapter"
      schema={createChapterSchema}
      onSuccessful={(data) =>
        navigate(PATH.chapter.admin.info(productId, data.id))
      }
      useFormProps={{
        // other Inputs have default value automatically
        defaultValues: {
          translatorId: translators[0].id,
        },
      }}
      submitButton="افزودن فصل"
    >
      <ChapterFormFields translators={translators} />
    </CreateEntityForm>
  );
}
