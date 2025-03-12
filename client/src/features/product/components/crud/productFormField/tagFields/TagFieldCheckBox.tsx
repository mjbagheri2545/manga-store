import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type TagFieldCheckBoxProps = ComponentProps<"input"> & {
  label: string;
};

function TagFieldCheckBox({ label, ...restProps }: TagFieldCheckBoxProps) {
  return (
    <label>
      <input
        type="checkbox"
        {...restProps}
        className={twMerge("checkbox checkbox-primary", restProps?.className)}
      />
      <span className="mr-1.5">{label}</span>
    </label>
  );
}

export default TagFieldCheckBox;
