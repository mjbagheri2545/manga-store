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
  navigatePath?: string;
  submitButton?: CrudFormProps<TFieldValues>["submitButton"];
} & (
    | { getIdFromData: (data: TEntityResponse) => string }
    | { onSuccessful: (data: TEntityResponse) => void }
  );

export function CreateEntityForm<
  TFieldValues extends FieldValues,
  TEntityResponse,
>({
  createMethod,
  entityKey,
  navigatePath,
  ...restProps
}: CreateEntityFormProps<TFieldValues, TEntityResponse>) {
  const navigate = useNavigate();

  async function handleOnSubmit(data: TFieldValues) {
    const response = await createMethod({ data });

    parseApiResponse(response, (result) => {
      if ("onSuccessful" in restProps) {
        return restProps.onSuccessful(result.data);
      }

      navigate(
        PATH.admin.info(entityKey, restProps.getIdFromData(result.data))
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
