import fs from "fs/promises";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { randomDate, randomIndex } from "./utils";

const PEAKY_BLINDERS_COUNT = 20;

async function createPeakyBlindersSeedFunction(prisma: PrismaClient) {
  const peakyBlindersSeeds = await fs.readdir(
    path.join(__dirname, "../../public/seed/peakyBlindersImage")
  );

  const statuses = await prisma.productStatus.findMany();
  const statusesLength = statuses.length;

  const peakyBlindersSeedsLength = peakyBlindersSeeds.length;

  console.log("Creating Peaky Blinders ...");
  for (let i = 0; i < PEAKY_BLINDERS_COUNT; i++) {
    const data: Partial<Prisma.ProductCreateInput> = {};

    data.category = {
      connect: {
        slug: "peaky-blinders",
      },
    };
    data.status = {
      connect: {
        id: statuses[randomIndex({ max: statusesLength })].id,
      },
    };
    data.manager = {
      connect: {
        email: "StevenKnight@gmail.com",
      },
    };

    data.tags = {
      connect: [{ slug: "action" }, { slug: "crime" }, { slug: "historical" }],
    };
    data.designer = "Steven Knight";
    data.writer = "Steven Knight";

    data.name = "Peaky Blinders";
    data.persianName = "پیکی بلایندرز";

    data.oneChapterPriceInToman = 3000;
    data.releaseYear = 2013;

    const randomImagePath =
      peakyBlindersSeeds[randomIndex({ max: peakyBlindersSeedsLength })];

    data.productImage = `seed/peakyBlindersImage/${randomImagePath}`;
    data.slug = `peaky-blinders-${i}`;
    data.createdAt = randomDate();
    data.summary = `Peaky Blinders is a 2013 British drama series that tells the story of the criminal gang of the same name. Led by Thomas Shelby, they control Birmingham during the 1920s and 1930s. Through bribery, violence, extortion and illegal trafficking, they consolidate their grip on the city.`;

    await prisma.product.create({
      data: data as Prisma.ProductCreateInput,
    });
  }
}

async function deletePeakyBlindersSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Peaky Blinders ...");
  await prisma.product.deleteMany({
    where: { slug: { contains: "peaky-blinders" } },
  });
}

export const deletePeakyBlinders = createSeed(deletePeakyBlindersSeedFunction);
export const createPeakyBlinders = createSeed(createPeakyBlindersSeedFunction);
