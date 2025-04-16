import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { randomIndex, randomInt } from "../utils";

const MIN_DISLIKES_COUNT = 0;
const MAX_DISLIKES_COUNT = 25;

async function createProductCommentDislikesSeedFunction(prisma: PrismaClient) {
  const [productComments, users] = await Promise.all([
    prisma.productComment.findMany({ select: { id: true } }),
    prisma.user.findMany({ select: { id: true } }),
  ]);

  console.log("Creating Product Comment Dislikes ...");
  for (const { id: commentId } of productComments) {
    const likesCount = randomInt({
      min: MIN_DISLIKES_COUNT,
      max: MAX_DISLIKES_COUNT,
    });

    let localUsers = await prisma.user.findMany({
      where: {
        NOT: {
          writtenProductComments: {
            some: {
              id: commentId,
              likes: {
                some: { likedById: { in: users.map((user) => user.id) } },
              },
            },
          },
        },
      },
    });

    for (let i = 0; i < likesCount; i++) {
      const dislikedById =
        localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != dislikedById);

      await prisma.productCommentDislike.create({
        data: {
          commentId,
          dislikedById,
        },
      });
    }
  }
}

async function deleteProductCommentDislikesSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Comment Dislikes ...");
  await prisma.productComment.deleteMany();
}

export const deleteProductCommentDislikes = createSeed(
  deleteProductCommentDislikesSeedFunction
);

export const createProductCommentDislikes = createSeed(
  createProductCommentDislikesSeedFunction
);
