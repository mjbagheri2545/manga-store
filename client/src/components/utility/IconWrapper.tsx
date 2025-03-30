import { twMerge } from "tailwind-merge";

import { PropsWithIcon } from "@/types";

export function IconWrapper({ Icon, iconProps }: PropsWithIcon) {
  return (
    <Icon
      size={24}
      {...iconProps}
      className={twMerge("text-white", iconProps?.className)}
    />
  );
}
