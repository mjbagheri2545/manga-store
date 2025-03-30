import { PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { randomIndex, randomInt } from "./utils";

const MIN_PRODUCTS_VIEWS_COUNT = 100;

export async function createProductViewsSeedFunction(prisma: PrismaClient) {
  const [products, users] = await Promise.all([
    prisma.product.findMany({ select: { id: true } }),
    prisma.user.findMany({ select: { id: true } }),
  ]);

  const usersLength = users.length;
  console.log("Creating Product Views ...");

  for (const { id: productId } of products) {
    const viewsCount = randomInt({
      min: MIN_PRODUCTS_VIEWS_COUNT,
      max: Math.floor(usersLength / 2),
    });
    let localUsers = [...users];

    for (let i = 0; i < viewsCount; i++) {
      const viewerId = localUsers[randomIndex({ max: localUsers.length })].id;
      localUsers = localUsers.filter((user) => user.id != viewerId);

      await prisma.productView.create({
        data: {
          productId,
          viewerId,
        },
      });
    }
  }
}

async function deleteProductViewsSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Views ...");
  await prisma.productView.deleteMany();
}

export const deleteProductViews = createSeed(deleteProductViewsSeedFunction);

export const createProductViews = createSeed(createProductViewsSeedFunction);
