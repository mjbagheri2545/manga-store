import { useEffect } from "react";

import {
  TableActions,
  TableColumn,
  TableWithActions,
} from "@/components/utility/table";
import { DEFAULT_QUERY_TAKE } from "@/constants/global/general.global";
import { useEntities } from "@/contexts/EntitiesContext";
import { useInfiniteApi } from "@/lib/api";
import { Entity, EntityKey, ICrudApi, TGetAllResponse } from "@/types";
import { formatSingularEntityName, getEntityName } from "@/utils";

import { Alert } from "../../utility/Alert";
import ApiComponent from "../ApiComponent";
import ApiErrorMessageList from "../ApiErrorMessageList";
import LoadMoreButton from "../LoadMoreButton";

export type CrudTableProps<TEntity extends Entity, TGetAllEntitiesResponse> = {
  entityKey: EntityKey;
  columns: TableColumn<TEntity>[];
  api: Pick<ICrudApi<TGetAllEntitiesResponse>, "getAll" | "delete">;
  // example usage of getEntitiesFromData:
  // (data: GetAllUsersResponse) => users
  getEntitiesFromData: (
    data: TGetAllResponse<TGetAllEntitiesResponse>
  ) => TEntity[];
};

export function CrudTable<TEntity extends Entity, TGetAllEntitiesResponse>(
  props: CrudTableProps<TEntity, TGetAllEntitiesResponse>
) {
  return (
    <ApiComponent
      apiMethod={() => props.api.getAll({ skip: 0, take: DEFAULT_QUERY_TAKE })}
    >
      {(result) => <CrudTableChildren data={result.data} {...props} />}
    </ApiComponent>
  );
}

type CrudTableChildrenProps<
  TEntity extends Entity,
  TGetAllEntitiesResponse,
> = CrudTableProps<TEntity, TGetAllEntitiesResponse> & {
  data: TGetAllResponse<TGetAllEntitiesResponse>;
};

function CrudTableChildren<TEntity extends Entity, TGetAllEntitiesResponse>({
  entityKey,
  api,
  columns,
  data,
  ...restProps
}: CrudTableChildrenProps<TEntity, TGetAllEntitiesResponse>) {
  const {
    error,
    status,
    hasMore,
    totalEntitiesCount,
    handleOnSuccessfulDelete,
    loadMoreEntities,
  } = useCrudTableChildren({
    data,
    api,
    ...restProps,
  });
  const [entities] = useEntities<TEntity>();

  const entityName = getEntityName(entityKey);
  if (entities.length === 0) {
    return (
      <Alert type="info">{`هیچ ${formatSingularEntityName(entityName)} وجود ندارد`}</Alert>
    );
  }
  // 192 is sum of all paddings, margins, and height of navbar
  return (
    <>
      <TableWithActions
        rows={entities}
        columns={columns}
        isLoading={status === "pending"}
        containerProps={{ className: "h-[calc(100dvh-192px)]" }}
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
        <LoadMoreButton
          buttonProps={{
            onClick: loadMoreEntities,
            isLoading: status === "pending",
          }}
        />
      )}
    </>
  );
}

type UseCrudTableChildrenOptions<
  TEntity extends Entity,
  TGetAllEntitiesResponse,
> = Pick<
  CrudTableProps<TEntity, TGetAllEntitiesResponse>,
  "getEntitiesFromData"
> & {
  api: CrudTableProps<TEntity, TGetAllEntitiesResponse>["api"];
  data: CrudTableChildrenProps<TEntity, TGetAllEntitiesResponse>["data"];
};

function useCrudTableChildren<TEntity extends Entity, TGetAllEntitiesResponse>({
  data,
  api,
  getEntitiesFromData,
}: UseCrudTableChildrenOptions<TEntity, TGetAllEntitiesResponse>) {
  const [entities, setEntities] = useEntities<TEntity>();

  const {
    status,
    error,
    hasMore,
    totalEntitiesCount,
    setTotalEntitiesCount,
    loadMoreEntities,
    refetch,
  } = useInfiniteApi({
    entitiesLength: entities.length,
    getAll: api.getAll,
    initialTotalCount: data.count,
    onSuccess: (data) =>
      setEntities((current) => [...current, ...getEntitiesFromData(data)]),
  });

  // set initial entities
  useEffect(() => {
    if (entities.length !== 0) return;

    setEntities(getEntitiesFromData(data));
  }, []);

  // simple entities refetching on remount
  useEffect(() => {
    if (entities.length === 0) return;

    refetch({
      params: { skip: 0, take: entities.length },
      onSuccess: (result) => {
        setTotalEntitiesCount(result.data.count);
        setEntities(getEntitiesFromData(result.data));
      },
    });
  }, []);

  function handleOnSuccessfulDelete(id: string) {
    if (entities.length === 0) return;

    const newEntities = entities.filter((entity) => entity.id != id);
    setTotalEntitiesCount((current) => current - 1);
    setEntities(newEntities);
  }

  return {
    error,
    status,
    handleOnSuccessfulDelete,
    loadMoreEntities,
    hasMore,
    totalEntitiesCount,
  };
}
