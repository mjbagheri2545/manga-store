import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  observerOptions?: IntersectionObserverInit;
};

export function useInView<T extends HTMLElement>({
  observerOptions,
}: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      // i tried this value and see these are good
      { threshold: 0.5, rootMargin: "0px 0px -25% 0px", ...observerOptions }
    );

    observer.observe(elementRef.current);
  }, [observerOptions]);

  return { inView, ref: elementRef };
}
