import { List, ListItem } from "@/components/utility/list";

import { useReplies } from "../../contexts/RepliesContext";
import ProductCommentReplyCard from "../productCommentCard/ProductCommentReplyCard";

function ProductCommentRepliesList() {
  const { replies } = useReplies();

  return (
    <List>
      {replies.map((reply) => (
        <ListItem
          key={reply.id}
          isGutterLess
          containerProps={{ className: "bg-dark flex-wrap" }}
        >
          <ProductCommentReplyCard reply={reply} />
        </ListItem>
      ))}
    </List>
  );
}

export default ProductCommentRepliesList;
