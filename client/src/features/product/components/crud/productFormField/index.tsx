import {
  FileInput,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/form";
import { FormFieldsContainer } from "@/components/ui/form";
import RenderItems from "@/components/ui/RenderItems";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import {
  GetProductByIdResponse,
  ManagersResponse,
} from "@/features/product/api";
import { MAX_SUMMARY_LENGTH } from "@/features/product/schemas";

import TagFields from "./tagFields";

type ProductFormFieldsProps = ManagersResponse & {
  product?: GetProductByIdResponse["product"];
};

function ProductFormFields({ managers, product }: ProductFormFieldsProps) {
  const { categories, productStatuses } = useProductGroups();

  return (
    <>
      <FormFieldsContainer>
        <InputField controllerName="name" label="نام" />
        <InputField controllerName="persianName" label="نام فارسی" />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <InputField controllerName="designer" label="طراح" />
        <InputField controllerName="writer" label="نویسنده" />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <SelectField
          controllerName="categoryId"
          label="دسته بندی"
          containerProps={{ className: "w-full md:w-auto md:flex-1" }}
        >
          <RenderItems
            items={categories}
            renderItem={(category) => (
              <option value={category.id}>{category.name}</option>
            )}
          />
        </SelectField>
        <SelectField
          controllerName="statusId"
          label="وضعیت محصول"
          containerProps={{ className: "w-full md:w-auto md:flex-1" }}
        >
          <RenderItems
            items={productStatuses}
            renderItem={(status) => (
              <option value={status.id}>{status.name}</option>
            )}
          />
        </SelectField>
        <SelectField
          controllerName="managerId"
          label="مدیر"
          containerProps={{ className: "w-full md:w-auto md:flex-1" }}
        >
          <RenderItems
            items={managers}
            renderItem={(manager) => (
              <option value={manager.id}>{manager.fullName}</option>
            )}
          />
        </SelectField>
      </FormFieldsContainer>
      <FormFieldsContainer>
        <InputField
          controllerName="oneChapterPriceInToman"
          label="قیمت هر فصل"
        />
        <InputField controllerName="slug" label="آدرس اینترنتی" />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <InputField controllerName="releaseYear" label="سال انتشار" />
        <FileInput
          controllerName="productImage"
          label="تصویر محصول"
          fieldProps={{
            filePath: product?.productImage,
            imageProps: { alt: product?.name },
          }}
          containerProps={{
            className:
              product?.productImage != null
                ? "md:w-full md:flex-none"
                : "w-full md:w-auto md:flex-1",
          }}
        />
      </FormFieldsContainer>
      <TagFields />
      <TextareaField
        controllerName="summary"
        label="خلاصه"
        fieldProps={{ placeholder: `حداکثر ${MAX_SUMMARY_LENGTH} حرف` }}
      />
    </>
  );
}

export default ProductFormFields;
