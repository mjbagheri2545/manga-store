import { twMerge } from "tailwind-merge";

import { SubmitButton } from "@/components/form";

type CreateProductCommentFormSubmitButtonProps = {
  className?: string;
};

function CreateProductCommentFormSubmitButton({
  className,
}: CreateProductCommentFormSubmitButtonProps) {
  return (
    <div className="w-full flex">
      <SubmitButton className={twMerge("mr-auto", className)} isWide>
        افزودن دیدگاه
      </SubmitButton>
    </div>
  );
}

export default CreateProductCommentFormSubmitButton;
