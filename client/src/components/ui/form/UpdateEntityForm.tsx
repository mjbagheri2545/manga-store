import { Context } from "react";
import { DefaultValues, FieldValues, FormState } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { Alert } from "@/components/utility/Alert";
import SHARED_MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import { TEntitiesContext, useEntities } from "@/contexts/EntitiesContext";
import { ApiResult, EntityKey, ICrudApi, WithId } from "@/types";
import { getEntityName, getUpdatedFields, parseApiResponse } from "@/utils";

import ApiComponent from "../ApiComponent";
import { CrudForm, CrudFormProps } from "../crud";

type UpdateEntityFormProps<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity,
> = Omit<CrudFormProps<TFieldValues>, "handleOnSubmit" | "submitButtonText"> & {
  api: Pick<
    ICrudApi<unknown, TEntityResponse, TFieldValues>,
    "getById" | "update"
  >;
  entityKey: EntityKey;
  getFieldsDefaultValues: (
    data: TEntityResponse
  ) => DefaultValues<TFieldValues>;
  getEntityFromData: (data: TEntityResponse) => TEntity;
  EntitiesContext: Context<TEntitiesContext<TEntity> | null>;
  navigatePath?: string;
};

export function UpdateEntityForm<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity extends WithId,
>({
  entityKey,
  ...restProps
}: UpdateEntityFormProps<TFieldValues, TEntityResponse, TEntity>) {
  const { id } = useParams();

  const entityName = getEntityName(entityKey);

  if (id == null) {
    return <Alert type="error">{`آیدی ${entityName} یافت نشد`}</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={restProps.api.getById}
      apiOptions={{ params: { id }, dependencies: [id] }}
    >
      {(result) => (
        <UpdateEntityFormChildren
          data={result.data}
          entityKey={entityKey}
          updateMethod={restProps.api.update}
          id={id}
          entityName={entityName}
          {...restProps}
        />
      )}
    </ApiComponent>
  );
}

type UpdateEntityFormChildrenProps<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity,
> = Omit<
  UpdateEntityFormProps<TFieldValues, TEntityResponse, TEntity>,
  "api"
> & {
  updateMethod: UpdateEntityFormProps<
    TFieldValues,
    TEntityResponse,
    TEntity
  >["api"]["update"];
  data: ApiResult<TEntityResponse>["data"];
  entityName: string;
  id: string;
};

function UpdateEntityFormChildren<
  TFieldValues extends FieldValues,
  TEntityResponse,
  TEntity extends WithId,
>({
  data,
  updateMethod,
  entityKey,
  getFieldsDefaultValues,
  id,
  entityName,
  navigatePath,
  getEntityFromData,
  EntitiesContext,
  ...restProps
}: UpdateEntityFormChildrenProps<TFieldValues, TEntityResponse, TEntity>) {
  const navigate = useNavigate();
  const { entities, setEntities } = useEntities(EntitiesContext);

  async function handleOnSubmit(
    data: TFieldValues,
    formState: FormState<TFieldValues>
  ) {
    const dataToUpdate = getUpdatedFields(data, formState);

    if (Object.keys(dataToUpdate).length === 0) {
      toast.error(SHARED_MESSAGES.general.noFieldUpdated);
      return;
    }

    const response = await updateMethod({ id, data: dataToUpdate });

    parseApiResponse(response, (result) => {
      const newEntity = getEntityFromData(result.data);
      const newEntities = entities.map((entity) => {
        if (entity.id === newEntity.id) {
          return newEntity;
        }

        return entity;
      });

      setEntities(newEntities);

      navigate(navigatePath ?? PATH.admin.index(entityKey));
    });
  }

  const defaultValues = getFieldsDefaultValues(data);

  return (
    <CrudForm
      {...restProps}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={`به‌روزرسانی ${entityName}`}
      useFormProps={{ defaultValues }}
    />
  );
}
