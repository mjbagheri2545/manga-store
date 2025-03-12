import { ComponentProps } from "react";

import env from "@/constants/env";

function Image(props: ComponentProps<"img"> & { src: string }) {
  return (
    <img
      {...props}
      src={`${env.VITE_API_END_POINT}/${props.src}`}
      alt={props.alt}
      crossOrigin="anonymous"
    />
  );
}

export default Image;
