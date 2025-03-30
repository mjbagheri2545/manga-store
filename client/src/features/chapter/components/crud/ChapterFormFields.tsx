import { FileInput, InputField, SelectField } from "@/components/form";
import { FormFieldsContainer } from "@/components/ui/form";
import RenderItems from "@/components/ui/RenderItems";
import { Chapter } from "@/types";

import { GetTranslatorsResponse } from "../../api";

type ChapterFormFieldsProps = GetTranslatorsResponse & {
  chapter?: Chapter;
};

function ChapterFormFields({ chapter, translators }: ChapterFormFieldsProps) {
  return (
    <>
      <FormFieldsContainer>
        <InputField controllerName="episode" label="قسمت" />
        <SelectField
          controllerName="translatorId"
          label="مترجم"
          containerProps={{ className: "w-full md:w-auto md:flex-1" }}
        >
          <RenderItems
            items={translators}
            renderItem={(translator) => (
              <option value={translator.id}>{translator.fullName}</option>
            )}
          />
        </SelectField>
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FileInput
          controllerName="chapterFile"
          label="فایل فصل"
          fieldProps={{
            filePath: chapter?.chapterFile,
          }}
          containerProps={{
            className: "flex-1",
          }}
        />
      </FormFieldsContainer>
    </>
  );
}

export default ChapterFormFields;
