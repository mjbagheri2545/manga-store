import { Context } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { TEntitiesContext, useEntities } from "@/contexts/EntitiesContext";
import { EntityKey, ICrudApi, WithId } from "@/types";
import { getEntityName, parseApiResponse } from "@/utils";

import { CrudForm, CrudFormProps } from "../crud";

type CreateEntityFormProps<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity,
> = Omit<CrudFormProps<TFieldValues>, "handleOnSubmit" | "submitButtonText"> & {
  createApi: ICrudApi<unknown, TEntityResponse, TFieldValues>["create"];
  entityKey: EntityKey;
  // example usage of getEntityFromData:
  // (data: UserResponse) => user
  getEntityFromData: (data: TEntityResponse) => TEntity;
  EntitiesContext: Context<TEntitiesContext<TEntity> | null>;
  navigatePath?: string;
};

export function CreateEntityForm<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity extends WithId,
>({
  createApi,
  entityKey,
  navigatePath,
  getEntityFromData,
  EntitiesContext,
  ...restProps
}: CreateEntityFormProps<TFieldValues, TEntityResponse, TEntity>) {
  const navigate = useNavigate();
  const { setEntities } = useEntities(EntitiesContext);

  async function handleOnSubmit(data: TFieldValues) {
    const response = await createApi({ data });

    parseApiResponse(response, (result) => {
      const entity = getEntityFromData(result.data);
      setEntities((current) => [...current, entity]);

      navigate(navigatePath ?? PATH.admin.info(entityKey, entity.id));
    });
  }

  const entityName = getEntityName(entityKey);

  return (
    <CrudForm
      {...restProps}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={`افزودن ${entityName}`}
    />
  );
}
