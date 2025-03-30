import React, { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  handleOnOutside: () => void
) {
  const handlerRef = useRef(handleOnOutside);

  useEffect(() => {
    const handleOnMouseDown = (e: MouseEvent) => {
      const isOutside =
        ref.current != null && !ref.current.contains(e.target as Node);

      if (isOutside) {
        handlerRef.current();
      }
    };

    document.addEventListener("mousedown", handleOnMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleOnMouseDown);
    };
  }, [ref]);
}
