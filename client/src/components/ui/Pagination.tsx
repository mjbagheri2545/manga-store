import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import { Button, ButtonComponentProps } from "../utility";

type PaginationProps = PropsWithContainer & {
  page: number;
  pagesCount: number;
  setPage: (page: number) => void;
  buttonProps?: ButtonComponentProps;
};

export function Pagination({
  page,
  pagesCount,
  setPage,
  buttonProps,
  containerProps,
}: PaginationProps) {
  const showPrevPageButton = page > 2;
  const showNextPageButton = pagesCount - page > 1;

  const buttonClassName = twMerge("bg-dark-body", buttonProps?.className);

  return (
    <div
      {...containerProps}
      className={twMerge(
        "flex gap-3 items-center justify-center mt-5",
        containerProps?.className
      )}
    >
      {page > 1 && (
        <Button
          {...buttonProps}
          variant="icon"
          className={buttonClassName}
          onClick={() => setPage(1)}
        >
          1
        </Button>
      )}
      {showPrevPageButton && "..."}
      {showPrevPageButton && (
        <Button
          {...buttonProps}
          variant="icon"
          className={buttonClassName}
          onClick={() => setPage(page - 1)}
        >
          {page - 1}
        </Button>
      )}
      <Button variant="icon" className="!bg-primary !text-white" disabled>
        {page}
      </Button>
      {showNextPageButton && (
        <Button
          {...buttonProps}
          variant="icon"
          className={buttonClassName}
          onClick={() => setPage(page + 1)}
        >
          {page + 1}
        </Button>
      )}
      {showNextPageButton && "..."}
      {page < pagesCount && (
        <Button
          {...buttonProps}
          variant="icon"
          className={buttonClassName}
          onClick={() => setPage(pagesCount)}
        >
          {pagesCount}
        </Button>
      )}
    </div>
  );
}
