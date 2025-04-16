import { createProductComments } from "./comment";
import { createProductCommentDislikes } from "./dislike";
import { createProductCommentLikes } from "./like";
import { createProductCommentReplyToReplies } from "./replyToReplies";
import { createRootProductCommentReplies } from "./rootCommentReplies";

export async function productCommentsSeeds() {
  await createProductComments();
  await createRootProductCommentReplies();
  await createProductCommentReplyToReplies();
  await createProductCommentLikes();
  await createProductCommentDislikes();
}
