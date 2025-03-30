import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";

const PRODUCT_STATUSES = [
  { name: "منتشر نشده", slug: "unpublished" },
  { name: "در حال پخش", slug: "ongoing" },
  { name: "پایان یافته", slug: "completed" },
];

async function createProductStatusesSeedFunction(prisma: PrismaClient) {
  console.log("Creating Product Statuses ...");
  for (const { name, slug } of PRODUCT_STATUSES) {
    await prisma.productStatus.create({ data: { name, slug } });
  }
}

async function deleteProductStatusesSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Product Statuses ...");
  await prisma.productStatus.deleteMany();
}

export const deleteProductStatuses = createSeed(
  deleteProductStatusesSeedFunction
);

export const createProductStatuses = createSeed(
  createProductStatusesSeedFunction
);
