import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { Button, ButtonComponentProps } from "../utility";

type LoadMoreButtonProps = {
  containerProps?: ComponentProps<"div">;
  buttonProps: ButtonComponentProps;
};

function LoadMoreButton({ containerProps, buttonProps }: LoadMoreButtonProps) {
  return (
    <div
      {...containerProps}
      className={twMerge("mt-5 flex w-full", containerProps?.className)}
    >
      <Button
        isWide
        {...buttonProps}
        className={twMerge("mx-auto", buttonProps.className)}
      >
        {buttonProps.children ?? "بارگیری بیشتر"}
      </Button>
    </div>
  );
}

export default LoadMoreButton;
