import { fakerFA as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { randomIndex, randomInt } from "../utils";

const MIN_ROOT_PRODUCT_COMMENT_REPLIES_COUNT = 0;
const MAX_ROOT_PRODUCT_COMMENT_REPLIES_COUNT = 4;

async function createRootProductCommentRepliesSeedFunction(
  prisma: PrismaClient
) {
  const rootProductComments = await prisma.productComment.findMany({
    select: { id: true, productId: true },
  });

  console.log("Creating Root Product Comments Replies ...");
  for (const { id: commentId, productId } of rootProductComments) {
    const rootRepliesCount = randomInt({
      min: MIN_ROOT_PRODUCT_COMMENT_REPLIES_COUNT,
      max: MAX_ROOT_PRODUCT_COMMENT_REPLIES_COUNT,
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
          parentId: commentId,
          replyToId,
        },
      });
    }
  }
}

export const createRootProductCommentReplies = createSeed(
  createRootProductCommentRepliesSeedFunction
);
