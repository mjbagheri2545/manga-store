import React from "react";
import { useFormContext } from "react-hook-form";

import { FormFieldsContainer } from "@/components/ui/form";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import { isStringArraysEquals } from "@/utils";

import TagFieldCheckBox from "./TagFieldCheckBox";

type TagFieldsProps = {
  defaultTags?: string[];
};

function TagFields({ defaultTags = [] }: TagFieldsProps) {
  const { tags } = useProductGroups();
  const { watch, setValue, formState, resetField } = useFormContext();

  const tagsId: string[] = watch("tagsId");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTagsId = e.target.checked
      ? [...tagsId, id]
      : tagsId.filter((tagId) => tagId !== id);

    setValue("tagsId", newTagsId, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (isStringArraysEquals(newTagsId, defaultTags)) {
      resetField("tagsId", { keepDirty: false });
    }
  }

  return (
    <FormFieldsContainer className="md:gap-6 flex-wrap">
      {tags.map((tag) => (
        <TagFieldCheckBox
          key={tag.id}
          label={tag.name}
          checked={tagsId.includes(tag.id)}
          onChange={(e) => handleOnChange(e, tag.id)}
        />
      ))}
      {formState.errors["tagsId"] != null && (
        <p className="text-error text-sm mx-1.5 mt-1 mb-3">
          {String(formState.errors["tagsId"].message)}
        </p>
      )}
    </FormFieldsContainer>
  );
}

export default TagFields;
