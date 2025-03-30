import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DEFAULT_QUERY_TAKE } from "@/constants/global/general.global";
import { ApiMethod, PaginateQuery, TGetAllResponse } from "@/types";

import { useExecuteApi } from "./useApi";

type UsePaginationProps<GetAllResponse> = {
  getAllMethod: ApiMethod<
    TGetAllResponse<GetAllResponse>,
    PaginateQuery | undefined
  >;
  take?: number;
  onSuccess?: (data: TGetAllResponse<GetAllResponse>) => void;
};

export function usePagination<GetAllResponse>({
  getAllMethod,
  onSuccess,
  take = DEFAULT_QUERY_TAKE,
}: UsePaginationProps<GetAllResponse>) {
  const [searchParams, setSearchParam] = useSearchParams();
  const [pagesCount, setPagesCount] = useState(1);

  const page = parseInt(searchParams.get("page") ?? "1");

  const {
    execute,
    result: _,
    ...restState
  } = useExecuteApi(getAllMethod, {
    onSuccess: (result) => {
      const newPagesCount = Math.ceil(result.data.count / take);
      setPagesCount(newPagesCount);
      onSuccess?.(result.data);
    },
  });

  function setPage(page: number) {
    setSearchParam((searchParams) => {
      searchParams.set("page", String(page));
      return searchParams;
    });
  }

  // if page changed, then searchParams changed and
  // fetch next page will trigger. but also i want trigger
  // fetch entities when any other searchParams changed.
  useEffect(() => {
    execute({
      params: { skip: (page - 1) * take, take },
    });
  }, [searchParams]);

  return { page, pagesCount, ...restState, setPage };
}
