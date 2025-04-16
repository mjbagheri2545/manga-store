import { fakerFA as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { randomIndex, randomInt } from "../utils";

const MIN_PRODUCT_COMMENTS_COUNT = 0;
const MAX_PRODUCT_COMMENTS_COUNT = 15;

async function createProductCommentsSeedFunction(prisma: PrismaClient) {
  const [products, users] = await Promise.all([
    prisma.product.findMany({ select: { id: true } }),
    prisma.user.findMany({ select: { id: true } }),
  ]);

  console.log("Creating Product Comments ...");
  for (const { id: productId } of products) {
    const commentsCount = randomInt({
      min: MIN_PRODUCT_COMMENTS_COUNT,
      max: MAX_PRODUCT_COMMENTS_COUNT,
    });
    let localUsers = [...users];

    for (let i = 0; i < commentsCount; i++) {
      const authorId = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != authorId);

      const messageWordsCount = randomInt({ min: 5, max: 25 });
      const message = faker.word.words(messageWordsCount);

      await prisma.productComment.create({
        data: {
          message,
          authorId,
          productId,
        },
      });
    }
  }
}

async function deleteProductCommentsSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Comments ...");
  await prisma.productComment.deleteMany();
}

export const deleteProductComments = createSeed(
  deleteProductCommentsSeedFunction
);

export const createProductComments = createSeed(
  createProductCommentsSeedFunction
);
