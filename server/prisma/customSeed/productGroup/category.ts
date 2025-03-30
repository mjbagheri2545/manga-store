import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";

const CATEGORIES = [
  { name: "مانگا", slug: "manga" },
  { name: "مانهوا", slug: "manhua" },
  { name: "مانها", slug: "manha" },
  { name: "پیکی بلایندرز", slug: "peaky-blinders" },
];

async function createCategoriesSeedFunction(prisma: PrismaClient) {
  console.log("Creating Categories ...");
  for (const { name, slug } of CATEGORIES) {
    await prisma.category.create({ data: { name, slug } });
  }
}

async function deleteCategoriesSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Categories ...");
  await prisma.category.deleteMany();
}

export const deleteCategories = createSeed(deleteCategoriesSeedFunction);

export const createCategories = createSeed(createCategoriesSeedFunction);
