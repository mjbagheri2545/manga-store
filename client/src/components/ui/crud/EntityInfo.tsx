import { useParams } from "react-router-dom";

import { LucideIcon } from "lucide-react";

import { Button } from "@/components/utility";
import { Alert } from "@/components/utility/Alert";
import PATH from "@/constants/path";
import { ApiResult, EntityKey, ICrudApi, StrictOmit, WithId } from "@/types";
import { getEntityName } from "@/utils";

import ApiComponent from "../ApiComponent";
import { EntityInfoList } from "./EntityInfoList";

type EntityInfoProps<TEntity extends WithId, TEntityResponse> = Omit<
  EntityInfoChildrenProps<TEntity, TEntityResponse>,
  "result"
> & {
  getByIdMethod: ICrudApi<unknown, TEntityResponse>["getById"];
};

export function EntityInfo<TEntity extends WithId, TEntityResponse>({
  getByIdMethod,
  ...restProps
}: EntityInfoProps<TEntity, TEntityResponse>) {
  const { id } = useParams();

  const entityName = getEntityName(restProps.entityKey);

  if (id == null) {
    return <Alert type="error">{`آیدی ${entityName} یافت نشد`}</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={getByIdMethod}
      apiOptions={{ params: { id }, dependencies: [id] }}
    >
      {(result) => <EntityInfoChildren result={result} {...restProps} />}
    </ApiComponent>
  );
}

type KeyInfo = {
  keyName: string;
  Icon: LucideIcon;
};

type EntityInfoChildrenProps<TEntity extends WithId, TEntityResponse> = {
  result: ApiResult<TEntityResponse>;
  entityKey: EntityKey;
  getEntityFromResult: (data: TEntityResponse) => TEntity;
  info: {
    [Key in keyof StrictOmit<TEntity, "id">]: KeyInfo;
  };
};

function EntityInfoChildren<TEntity extends WithId, TEntityResponse>({
  result,
  entityKey,
  getEntityFromResult,
  info,
}: EntityInfoChildrenProps<TEntity, TEntityResponse>) {
  const entity = getEntityFromResult(result.data);

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
