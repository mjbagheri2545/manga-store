import { useParams } from "react-router-dom";

import { Button } from "@/components/utility";
import { Alert } from "@/components/utility/Alert";
import PATH from "@/constants/path";
import { Entity, EntityKey, ICrudApi } from "@/types";
import { getEntityName } from "@/utils";

import ApiComponent from "../../ApiComponent";
import { EntityInfoList, TEntityInfo } from "./EntityInfoList";

type EntityInfoProps<TEntity extends Entity, TGetByIdResponse> = Omit<
  EntityInfoChildrenProps<TEntity, TGetByIdResponse>,
  "data"
> & {
  getByIdMethod: ICrudApi<unknown, TGetByIdResponse>["getById"];
};

export function EntityInfo<TEntity extends Entity, TGetByIdResponse>({
  getByIdMethod,
  ...restProps
}: EntityInfoProps<TEntity, TGetByIdResponse>) {
  const { id } = useParams();

  const entityName = getEntityName(restProps.entityKey);

  if (id == null) {
    return <Alert type="error">{`آیدی ${entityName} یافت نشد`}</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => getByIdMethod({ id })}
      apiMethodOptions={{ dependencies: [id] }}
    >
      {(result) => <EntityInfoChildren data={result.data} {...restProps} />}
    </ApiComponent>
  );
}

type EntityInfoChildrenProps<TEntity extends Entity, TGetByIdResponse> = {
  data: TGetByIdResponse;
  entityKey: EntityKey;
  getEntityFromData: (data: TGetByIdResponse) => TEntity;
  info: TEntityInfo<TEntity>;
};

function EntityInfoChildren<TEntity extends Entity, TGetByIdResponse>({
  data,
  entityKey,
  getEntityFromData,
  info,
}: EntityInfoChildrenProps<TEntity, TGetByIdResponse>) {
  const entity = getEntityFromData(data);

  return (
    <>
      <EntityInfoList info={info} entity={entity} />
      <Button
        isLinkComponent
        to={PATH.admin.update(entityKey, entity.id)}
        isWide
        className="mt-6"
      >
        به‌روزرسانی
      </Button>
    </>
  );
}
