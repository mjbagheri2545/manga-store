import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { randomIndex, randomInt } from "../utils";

const MIN_LIKES_COUNT = 0;
const MAX_LIKES_COUNT = 10;

async function createProductCommentLikesSeedFunction(prisma: PrismaClient) {
  const [comments, users] = await Promise.all([
    prisma.productComment.findMany({ select: { id: true } }),
    prisma.user.findMany({ select: { id: true } }),
  ]);

  console.log("Creating Product Comment Likes ...");

  for (const { id: commentId } of comments) {
    const likesCount = randomInt({
      min: MIN_LIKES_COUNT,
      max: MAX_LIKES_COUNT,
    });
    let localUsers = [...users];

    for (let i = 0; i < likesCount; i++) {
      const likedById = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != likedById);

      await prisma.productCommentLike.create({
        data: {
          commentId,
          likedById,
        },
      });
    }
  }
}

async function deleteProductCommentLikesSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Comment Likes ...");
  await prisma.productComment.deleteMany();
}

export const deleteProductCommentLikes = createSeed(
  deleteProductCommentLikesSeedFunction
);

export const createProductCommentLikes = createSeed(
  createProductCommentLikesSeedFunction
);
