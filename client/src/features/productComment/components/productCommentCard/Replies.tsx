import { useRef } from "react";

import { useToggleState } from "@/hooks";

import { useReplies } from "../../contexts/RepliesContext";
import { useRootProductComment } from "../../contexts/RootProductCommentContext";
import ProductCommentRepliesListSection from "../productCommentsListSection/ProductCommentRepliesListSection";
import { ShowReplies } from "./ShowReplies";

export function Replies() {
  const [isShowReplies, toggleIsShowReplies] = useToggleState();
  const isRepliesShowsOnceRef = useRef(false);
  const { replies } = useReplies();
  const rootProductComment = useRootProductComment();

  function handleOnToggleIsShowReplies() {
    if (!isRepliesShowsOnceRef.current) {
      isRepliesShowsOnceRef.current = true;
    }

    toggleIsShowReplies();
  }
  return (
    (rootProductComment.repliesCount > 0 || replies.length > 0) && (
      <>
        <ShowReplies
          handleOnToggleIsShowReplies={handleOnToggleIsShowReplies}
          isShowReplies={isShowReplies}
          isShowRepliesOnce={isRepliesShowsOnceRef.current}
        />
        {isRepliesShowsOnceRef.current && isShowReplies && (
          <div className="mr-4 sm:mr-16 w-full">
            <ProductCommentRepliesListSection />
          </div>
        )}
      </>
    )
  );
}
