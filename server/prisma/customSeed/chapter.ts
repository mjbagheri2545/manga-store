import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { randomIndex, randomInt } from "./utils";

const MIN_CHAPTERS_COUNT = 70;
const MAX_CHAPTERS_COUNT = 200;

async function createChaptersSeedFunction(prisma: PrismaClient) {
  const [products, translators] = await Promise.all([
    prisma.product.findMany({ select: { id: true } }),
    prisma.user.findMany({
      where: { roles: { has: "translator" } },
      select: { id: true },
    }),
  ]);

  const translatorsCount = randomInt({ min: 5, max: 15 });
  const randomTranslators: { id: string }[] = [];
  let localTranslators = [...translators];

  for (let i = 0; i < translatorsCount; i++) {
    const randomTranslator =
      localTranslators[randomIndex({ max: translatorsCount })];

    localTranslators = translators.filter(
      (translator) => translator.id != randomTranslator.id
    );

    randomTranslators.push(randomTranslator);
  }

  console.log("Creating Chapters ...");

  const chapterFileSeeds = await fs.readdir(
    path.join(__dirname, "../../public/seed/chapterFile")
  );

  const chapterFileSeedsLength = chapterFileSeeds.length;

  for (const { id: productId } of products) {
    const finalChaptersCount = randomInt({
      min: MIN_CHAPTERS_COUNT,
      max: MAX_CHAPTERS_COUNT,
    });

    for (let i = 0; i < finalChaptersCount; i++) {
      const translatorId =
        randomTranslators[randomIndex({ max: translatorsCount })].id;

      const randomChapterFile =
        chapterFileSeeds[randomIndex({ max: chapterFileSeedsLength })];

      await prisma.chapter.create({
        data: {
          episode: i + 1,
          status: i > 3 ? "private" : "public",
          productId,
          translatorId,
          chapterFile: `seed/chapterFile/${randomChapterFile}`,
        },
      });
    }
  }
}

async function deleteChaptersSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Chapters ...");
  await prisma.chapter.deleteMany();
}

export const deleteChapters = createSeed(deleteChaptersSeedFunction);

export const createChapters = createSeed(createChaptersSeedFunction);
