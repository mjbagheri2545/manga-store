import { useLayoutEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    function handleOnChange() {
      setMatches(matchMedia.matches);
    }
    handleOnChange();

    matchMedia.addEventListener("change", handleOnChange);

    return () => matchMedia.removeEventListener("change", handleOnChange);
  }, [query]);

  return matches;
}
