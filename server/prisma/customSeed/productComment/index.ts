import { createProductComments } from "./comment";
import { createProductCommentDislikes } from "./dislike";
import { createProductCommentLikes } from "./like";

export async function productCommentsSeeds() {
  await createProductComments();
  await createProductCommentLikes();
  await createProductCommentDislikes();
}
