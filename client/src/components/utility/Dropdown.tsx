import React, { ComponentProps, useRef } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { useClickOutside, useToggleState } from "@/hooks";
import { cn } from "@/utils";

import { List, ListProps } from "./list";

type DropdownProps = {
  title: string;
  containerProps?: ComponentProps<"div">;
  contentProps?: ListProps;
  dropdownButtonProps?: ComponentProps<"div">;
  children: (onClose: () => void) => React.ReactNode;
};

// note: this is directly from daisyui docs:
//We can't use <button> here because Safari has a bug that prevents the button from being focused.
//<div role="button" tabindex="0"> is a workaround for this bug.
//It is accessible and works in all browsers.

// because i don't like default behavior of daisyui dropdown,
// i control open and close state of Dropdown for better user experience

export function Dropdown({
  title,
  children,
  containerProps,
  contentProps,
  dropdownButtonProps,
}: DropdownProps) {
  const [isOpened, toggleIsOpened, setIsOpened] = useToggleState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsOpened(false));

  return (
    <div
      {...containerProps}
      ref={dropdownRef}
      className={cn(
        "dropdown",
        isOpened && "dropdown-open",
        containerProps?.className
      )}
    >
      <div
        {...dropdownButtonProps}
        tabIndex={0}
        role="button"
        className={cn(
          "btn btn-block bg-dark-body text-white",
          dropdownButtonProps?.className
        )}
        onClick={toggleIsOpened}
        // because of jsx-a11y
        onKeyDown={() => {}}
      >
        {title}
        {isOpened ? (
          <ChevronUp className="size-5 mt-1" />
        ) : (
          <ChevronDown className="size-5 mt-1" />
        )}
      </div>
      <List
        {...contentProps}
        className={cn(
          "dropdown-content gap-2 bg-base-100 mt-1 menu rounded z-20 w-52 shadow-lg shadow-slate-900",
          contentProps?.className
        )}
      >
        {children(() => setIsOpened(false))}
      </List>
    </div>
  );
}
