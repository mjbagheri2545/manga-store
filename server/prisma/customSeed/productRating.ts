import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { randomIndex, randomInt } from "./utils";

const MIN_PRODUCTS_RATINGS_COUNT = 0;

async function createProductRatingsSeedFunction(prisma: PrismaClient) {
  const [products, users] = await Promise.all([
    prisma.product.findMany({ select: { id: true } }),
    prisma.user.findMany({ select: { id: true } }),
  ]);

  const usersLength = users.length;
  console.log("Creating Product Ratings ...");

  for (const { id: productId } of products) {
    const ratingsCount = randomInt({
      min: MIN_PRODUCTS_RATINGS_COUNT,
      max: Math.floor(usersLength / 2),
    });
    let localUsers = [...users];

    for (let i = 0; i < ratingsCount; i++) {
      const ratedById = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != ratedById);

      await prisma.productRating.create({
        data: {
          productId,
          ratedById,
          rating: faker.number.int({ min: 1, max: 5 }),
        },
      });
    }
  }
}

async function deleteProductRatingsSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Ratings ...");
  await prisma.productRating.deleteMany();
}

export const deleteProductRatings = createSeed(
  deleteProductRatingsSeedFunction
);

export const createProductRatings = createSeed(
  createProductRatingsSeedFunction
);
