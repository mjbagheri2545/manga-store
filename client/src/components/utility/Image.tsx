import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import env from "@/constants/env";

export function Image({
  src,
  alt,
  className,
  ...restProps
}: ComponentProps<"img"> & { src: string }) {
  // just for testing and for development purposes
  // this should remove in production
  const finalSrc =
    src.includes("uploads") || src.includes("seed")
      ? `${env.VITE_SERVER_END_POINT}/${src}`
      : src;

  return (
    <img
      {...restProps}
      className={twMerge("max-h-fit", className)}
      src={finalSrc}
      alt={alt}
      crossOrigin="anonymous"
    />
  );
}
