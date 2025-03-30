import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";

const TAGS = [
  { name: "اخرالزمانی", slug: "apocalypse" },
  { name: "ترسناک", slug: "scary" },
  { name: "زامبی", slug: "zombie" },
  { name: "شیاطین", slug: "demons" },
  { name: "ماوراء طبیعی", slug: "supernatural" },
  { name: "اکشن", slug: "action" },
  { name: "رازآلود", slug: "mysterious" },
  { name: "عاشقانه", slug: "romantic" },
  { name: "علمی تخیلی", slug: "science-fiction" },
  { name: "جادویی", slug: "magical" },
  { name: "فانتزی", slug: "fantasy" },
  { name: "	درام", slug: "drama" },
  { name: "هنر های رزمی", slug: "martial-arts" },
  { name: "کمدی", slug: "comedy" },
  { name: "تاریخی", slug: "historical" },
  { name: "ماجراجویی", slug: "adventure" },
  { name: "ابرقهرمانی", slug: "superhero" },
  { name: "جنایی", slug: "crime" },
];

async function createTagsSeedFunction(prisma: PrismaClient) {
  console.log("Creating Tags ...");
  for (const { name, slug } of TAGS) {
    await prisma.tag.create({ data: { name, slug } });
  }
}

async function deleteTagsSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Tags ...");
  await prisma.tag.deleteMany();
}

export const deleteTags = createSeed(deleteTagsSeedFunction);

export const createTags = createSeed(createTagsSeedFunction);
