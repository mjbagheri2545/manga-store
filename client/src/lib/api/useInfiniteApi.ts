import { useCallback, useMemo, useState } from "react";

import { DEFAULT_QUERY_TAKE } from "@/constants/global/general.global";
import { ApiMethod, PaginateQuery, TGetAllResponse } from "@/types";

import { useExecuteApi } from "./useApi";

type UseInfiniteApiOptions<GetAllResponse> = {
  getAll: ApiMethod<TGetAllResponse<GetAllResponse>, PaginateQuery | undefined>;
  initialTotalCount?: number;
  onSuccess: (data: TGetAllResponse<GetAllResponse>) => void;
  entitiesLength: number;
};

export function useInfiniteApi<GetAllResponse>({
  initialTotalCount = 0,
  getAll,
  onSuccess,
  entitiesLength,
}: UseInfiniteApiOptions<GetAllResponse>) {
  const [totalEntitiesCount, setTotalEntitiesCount] =
    useState(initialTotalCount);

  const { execute, refetch, ...restState } = useExecuteApi(getAll, {
    onSuccess: (result) => {
      setTotalEntitiesCount(result.data.count);
      onSuccess(result.data);
    },
  });

  const hasMore = useMemo(
    () => totalEntitiesCount > entitiesLength,
    [entitiesLength, totalEntitiesCount]
  );

  const loadMoreEntities = useCallback(() => {
    if (!hasMore) return;
    execute({
      params: { skip: entitiesLength, take: DEFAULT_QUERY_TAKE },
    });
  }, [entitiesLength, execute, hasMore]);

  return {
    totalEntitiesCount,
    hasMore,
    setTotalEntitiesCount,
    loadMoreEntities,
    refetch,
    ...restState,
  };
}
