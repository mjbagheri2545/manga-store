import { useEffect, useMemo, useState } from "react";

import { DEFAULT_TAKE } from "@/constants/global/general.global";
import { ICrudApi, State, TGetAllResponse } from "@/types";

import { useExecuteApi } from "./useApi";

type UseInfiniteApiOptions<T, R> = {
  entities: State<T[]>[0];
  setEntities: State<T[]>[1];
  getAll: ICrudApi<TGetAllResponse<R>>["getAll"];
  getEntitiesFromData: (data: TGetAllResponse<R>) => T[];
  initialTotalCount?: number;
};

export function useInfiniteApi<T, R>({
  entities,
  setEntities,
  initialTotalCount = 0,
  getAll,
  getEntitiesFromData,
}: UseInfiniteApiOptions<T, R>) {
  const [totalEntitiesCount, setTotalEntitiesCount] =
    useState(initialTotalCount);

  const { execute, refetch, ...restState } = useExecuteApi(getAll, {
    onSuccess: (result) => {
      setTotalEntitiesCount(result.data.count);
      setEntities((current) => [
        ...current,
        ...getEntitiesFromData(result.data),
      ]);
    },
  });

  const hasMore = useMemo(
    () => totalEntitiesCount > entities.length,
    [entities.length, totalEntitiesCount]
  );

  async function loadMoreEntities() {
    if (!hasMore) return;
    execute({
      params: { skip: entities.length, take: DEFAULT_TAKE },
    });
  }

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

  return {
    totalEntitiesCount,
    hasMore,
    setTotalEntitiesCount,
    loadMoreEntities,
    refetch,
    ...restState,
  };
}
