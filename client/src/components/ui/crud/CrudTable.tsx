import { Context, useEffect } from "react";

import {
  TableActions,
  TableColumn,
  TableWithActions,
} from "@/components/utility/table";
import { DEFAULT_TAKE } from "@/constants/global/general.global";
import { TEntitiesContext, useEntities } from "@/contexts/EntitiesContext";
import { useInfiniteApi } from "@/lib/api";
import { EntityKey, ICrudApi, TGetAllResponse, WithId } from "@/types";
import { formatSingularEntityName, getEntityName } from "@/utils";

import { Button } from "../../utility";
import { Alert } from "../../utility/Alert";
import ApiComponent from "../ApiComponent";
import ApiErrorMessageList from "../ApiErrorMessageList";

export type CrudTableProps<TEntity extends WithId, TGetAllEntitiesResponse> = {
  entityKey: EntityKey;
  columns: TableColumn<TEntity>[];
  api: ICrudApi<TGetAllEntitiesResponse, any, any>;
  // example usage of getEntitiesFromData:
  // (data: GetAllUsersResponse) => users
  getEntitiesFromData: (
    data: TGetAllResponse<TGetAllEntitiesResponse>
  ) => TEntity[];
  Context: Context<TEntitiesContext<TEntity> | null>;
};

export function CrudTable<TEntity extends WithId, TGetAllEntitiesResponse>({
  api,
  ...restProps
}: CrudTableProps<TEntity, TGetAllEntitiesResponse>) {
  return (
    <ApiComponent
      apiMethod={api.getAll}
      apiOptions={{ params: { skip: 0, take: DEFAULT_TAKE } }}
    >
      {(result) => (
        <CrudTableChildren api={api} data={result.data} {...restProps} />
      )}
    </ApiComponent>
  );
}

type CrudTableChildrenProps<
  TEntity extends WithId,
  TGetAllEntitiesResponse,
> = CrudTableProps<TEntity, TGetAllEntitiesResponse> & {
  data: TGetAllResponse<TGetAllEntitiesResponse>;
};

function CrudTableChildren<TEntity extends WithId, TGetAllEntitiesResponse>({
  entityKey,
  api,
  columns,
  data,
  ...restProps
}: CrudTableChildrenProps<TEntity, TGetAllEntitiesResponse>) {
  const {
    error,
    entities,
    status,
    hasMore,
    totalEntitiesCount,
    handleOnSuccessfulDelete,
    loadMoreEntities,
  } = useCrudTableChildren({
    data,
    getAll: api.getAll,
    ...restProps,
  });

  const entityName = getEntityName(entityKey);
  if (entities.length === 0) {
    return (
      <Alert type="info">{`هیچ ${formatSingularEntityName(entityName)} وجود ندارد`}</Alert>
    );
  }
  // 192 is sum of all paddings, margins, and height of navbar
  return (
    <div className="overflow-hidden h-[calc(100dvh-192px)]">
      <div className="overflow-y-auto h-full" dir="ltr">
        <TableWithActions
          rows={entities}
          columns={columns}
          isLoading={status === "pending"}
          containerProps={{ dir: "rtl" }}
        >
          {(id) => {
            return (
              <TableActions
                deleteMethod={api.delete}
                entityKey={entityKey}
                id={id}
                onSuccessfulDelete={handleOnSuccessfulDelete}
              />
            );
          }}
        </TableWithActions>
        <div className="ml-auto pl-2 mt-1 mb-2 text-lg">
          {`${entities.length}/${totalEntitiesCount} ${entityName}`}
        </div>
        {error != null && <ApiErrorMessageList error={error} />}
        {hasMore && (
          <div className="mt-4 flex">
            <Button
              onClick={loadMoreEntities}
              className="btn-wide mx-auto"
              isLoading={status === "pending"}
            >
              بارگیری بیشتر
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

type UseCrudTableChildrenOptions<
  TEntity extends WithId,
  TGetAllEntitiesResponse,
> = Pick<
  CrudTableProps<TEntity, TGetAllEntitiesResponse>,
  "getEntitiesFromData" | "Context"
> & {
  getAll: CrudTableProps<TEntity, TGetAllEntitiesResponse>["api"]["getAll"];
  data: CrudTableChildrenProps<TEntity, TGetAllEntitiesResponse>["data"];
};

function useCrudTableChildren<TEntity extends WithId, TGetAllEntitiesResponse>({
  data,
  getAll,
  getEntitiesFromData,
  Context,
}: UseCrudTableChildrenOptions<TEntity, TGetAllEntitiesResponse>) {
  const { entities, setEntities } = useEntities(Context);

  const {
    status,
    error,
    hasMore,
    totalEntitiesCount,
    setTotalEntitiesCount,
    loadMoreEntities,
  } = useInfiniteApi({
    entities,
    setEntities,
    getAll,
    getEntitiesFromData,
    initialTotalCount: data.count,
  });

  useEffect(() => {
    if (entities.length !== 0) return;

    setEntities(getEntitiesFromData(data));
  }, [entities.length, getEntitiesFromData, data, setEntities]);

  function handleOnSuccessfulDelete(id: string) {
    if (entities.length === 0) return;

    const newEntities = entities.filter((entity) => entity.id != id);
    setTotalEntitiesCount((current) => current - 1);
    setEntities(newEntities);
  }

  return {
    error,
    status,
    entities,
    handleOnSuccessfulDelete,
    loadMoreEntities,
    hasMore,
    totalEntitiesCount,
  };
}
