import { useSearchParams } from "react-router-dom";

export function useQuerySort() {
  const [searchParams] = useSearchParams();

  return searchParams.get("sort") ?? undefined;
}
