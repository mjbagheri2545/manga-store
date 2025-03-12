import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { Button, ButtonComponentProps } from "../utility";

export function SubmitButton({
  className,
  disabled,
  isLoading,
  children,
  ...restProps
}: ButtonComponentProps) {
  const {
    formState: { isDirty, isValid, submitCount, isSubmitting },
  } = useFormContext();

  return (
    <Button
      {...restProps}
      type="submit"
      disabled={(isDirty && !isValid && submitCount > 0) || disabled}
      isLoading={isSubmitting || isLoading}
      // [&&&&] because of specificity space-y-4 in form is (0,3,0)
      // and i want to override it and don't want to use !important
      className={twMerge("btn-block [&&&&]:mt-10", className)}
    >
      {children}
    </Button>
  );
}
