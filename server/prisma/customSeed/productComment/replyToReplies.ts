import { fakerFA as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { randomIndex, randomInt } from "../utils";

const MIN_PRODUCT_COMMENT_REPLY_TO_REPLIES_COUNT = 0;
const MAX_PRODUCT_COMMENT_REPLY_TO_REPLIES_COUNT = 6;

async function createProductCommentReplyToRepliesSeedFunction(
  prisma: PrismaClient
) {
  const rootProductCommentsReplies = await prisma.productComment.findMany({
    where: { parentId: { not: null } },
    select: { id: true, productId: true, parentId: true },
  });

  console.log("Creating Product Comments Reply To Replies ...");
  for (const {
    id: commentId,
    productId,
    parentId,
  } of rootProductCommentsReplies) {
    const rootRepliesCount = randomInt({
      min: MIN_PRODUCT_COMMENT_REPLY_TO_REPLIES_COUNT,
      max: MAX_PRODUCT_COMMENT_REPLY_TO_REPLIES_COUNT,
    });

    let localUsers = await prisma.user.findMany({
      where: { writtenProductComments: { none: { id: commentId } } },
    });

    for (let i = 0; i < rootRepliesCount; i++) {
      const authorId = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != authorId);

      const replyToId = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != replyToId);

      const messageWordsCount = randomInt({ min: 5, max: 25 });
      const message = faker.word.words(messageWordsCount);

      await prisma.productComment.create({
        data: {
          message,
          authorId,
          productId,
          parentId,
          replyToId,
        },
      });
    }
  }
}

export const createProductCommentReplyToReplies = createSeed(
  createProductCommentReplyToRepliesSeedFunction
);
