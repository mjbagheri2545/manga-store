import { useMediaQuery } from "./useMediaQuery";

export function useMaxWidth(maxWidth: number) {
  return useMediaQuery(`(max-width: ${maxWidth}px)`);
}
