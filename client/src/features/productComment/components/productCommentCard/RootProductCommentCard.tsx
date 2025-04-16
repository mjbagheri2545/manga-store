import { useRootProductComment } from "../../contexts/RootProductCommentContext";
import { useRootProductComments } from "../../contexts/RootProductCommentsContext";
import MemoizedRepliesProvider from "../RepliesProvider";
import { Replies } from "./Replies";
import { ProductCommentCard } from ".";

export function RootProductCommentCard() {
  const { handleOnDeleteRootProductComment } = useRootProductComments();
  const rootProductComment = useRootProductComment();

  return (
    <MemoizedRepliesProvider>
      <ProductCommentCard
        onSuccessfulDelete={handleOnDeleteRootProductComment}
        productComment={rootProductComment}
      />
      <Replies />
    </MemoizedRepliesProvider>
  );
}
