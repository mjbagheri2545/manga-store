import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { useReplies } from "../../contexts/RepliesContext";

type ShowRepliesProps = {
  handleOnToggleIsShowReplies: () => void;
  isShowReplies: boolean;
  isShowRepliesOnce: boolean;
};

export function ShowReplies({
  isShowReplies,
  isShowRepliesOnce,
  handleOnToggleIsShowReplies,
}: ShowRepliesProps) {
  const { replies } = useReplies();

  return (
    (!isShowRepliesOnce || replies.length > 0) && (
      <div className="mr-0 sm:mr-16 w-full mb-4">
        <button
          onClick={handleOnToggleIsShowReplies}
          className="bg-transparent transition rounded hover:bg-slate-50/10 px-3 py-2 h-fit flex items-center gap-1"
        >
          {isShowReplies ? (
            <ChevronUpIcon className="size-5 mt-1" />
          ) : (
            <ChevronDownIcon className="size-5 mt-1" />
          )}
          <span>{isShowReplies ? "مخفی کردن" : "نمایش"} پاسخ ها</span>
        </button>
      </div>
    )
  );
}
