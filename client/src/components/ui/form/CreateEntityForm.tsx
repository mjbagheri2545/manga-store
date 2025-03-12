import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { EntityKey, ICrudApi } from "@/types";
import { getEntityName, parseApiResponse } from "@/utils";

import { CrudForm, CrudFormProps } from "../crud";

type CreateEntityFormProps<
  TFieldValues extends FieldValues,
  TEntityResponse,
> = Omit<CrudFormProps<TFieldValues>, "handleOnSubmit" | "submitButton"> & {
  createMethod: ICrudApi<
    unknown,
    unknown,
    TFieldValues,
    TEntityResponse
  >["create"];
  entityKey: EntityKey;
  // example usage of getEntityFromData:
  // (data: UserResponse) => user
  getIdFromData: (data: TEntityResponse) => string;
  navigatePath?: string;
  submitButton?: CrudFormProps<TFieldValues>["submitButton"];
};

export function CreateEntityForm<
  TFieldValues extends FieldValues,
  TEntityResponse,
>({
  createMethod,
  entityKey,
  navigatePath,
  getIdFromData,
  ...restProps
}: CreateEntityFormProps<TFieldValues, TEntityResponse>) {
  const navigate = useNavigate();

  async function handleOnSubmit(data: TFieldValues) {
    const response = await createMethod({ data });

    parseApiResponse(response, (result) => {
      navigate(
        navigatePath ?? PATH.admin.info(entityKey, getIdFromData(result.data))
      );
    });
  }

  const entityName = getEntityName(entityKey);

  return (
    <CrudForm
      {...restProps}
      submitButton={restProps.submitButton ?? `افزودن ${entityName}`}
      handleOnSubmit={handleOnSubmit}
    />
  );
}
