import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import { Entity, EntityKey, ICrudApi } from "@/types";
import { getEntityName } from "@/utils";

import { ApiIdComponent } from "../../api";
import { EntityInfoList, TEntityInfo } from "./EntityInfoList";

type EntityInfoProps<TEntity extends Entity, TGetByIdResponse> = {
  entityKey: EntityKey;
  getEntityFromData: (data: TGetByIdResponse) => TEntity;
  info: TEntityInfo<TEntity>;
  getByIdMethod: ICrudApi<unknown, TGetByIdResponse>["getById"];
};

export function EntityInfo<TEntity extends Entity, TGetByIdResponse>({
  getByIdMethod,
  entityKey,
  getEntityFromData,
  info,
}: EntityInfoProps<TEntity, TGetByIdResponse>) {
  return (
    <ApiIdComponent
      getByIdMethod={getByIdMethod}
      entityName={getEntityName(entityKey)}
    >
      {(data, id) => (
        <>
          <EntityInfoList info={info} entity={getEntityFromData(data)} />
          <Button
            isLinkComponent
            to={PATH.admin.update(entityKey, id)}
            isWide
            className="mt-6"
          >
            به‌روزرسانی
          </Button>
        </>
      )}
    </ApiIdComponent>
  );
}
