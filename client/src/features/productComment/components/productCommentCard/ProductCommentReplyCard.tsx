import { Link } from "@/components/utility";

import { GetAllReplyBase } from "../../api";
import { useReplies } from "../../contexts/RepliesContext";
import { ProductCommentCard } from ".";

type ProductCommentReplyCardProps = {
  reply: GetAllReplyBase;
};

function ProductCommentReplyCard({ reply }: ProductCommentReplyCardProps) {
  const { handleOnDeleteReply } = useReplies();

  return (
    <ProductCommentCard
      productComment={reply}
      onSuccessfulDelete={handleOnDeleteReply}
      parentId={reply.parentId}
      replyTo={(reply) => (
        <Link to="#" className="inline-block ml-2 text-wrap">
          {reply.replyTo.fullName}
        </Link>
      )}
    />
  );
}

export default ProductCommentReplyCard;
