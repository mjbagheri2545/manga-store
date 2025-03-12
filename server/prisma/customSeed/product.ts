import fs from "fs/promises";
import path from "path";
import { fakerFA as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { Promises } from "./types";
import { randomDate, randomIndex, randomInt } from "./utils";

const words = [
  { en: "Shadow", fa: "سایه" },
  { en: "Warrior", fa: "جنگجو" },
  { en: "Legend", fa: "افسانه" },
  { en: "Dragon", fa: "اژدها" },
  { en: "Blade", fa: "تیغه" },
  { en: "Spirit", fa: "روح" },
  { en: "Chronicles", fa: "روایت‌ها" },
  { en: "Destiny", fa: "سرنوشت" },
  { en: "Demon", fa: "شیطان" },
  { en: "Eclipse", fa: "کسوف" },
  { en: "Phoenix", fa: "ققنوس" },
  { en: "Storm", fa: "طوفان" },
  { en: "Cursed", fa: "نفرین‌شده" },
  { en: "Moonlight", fa: "مهتاب" },
  { en: "Sorcerer", fa: "جادوگر" },
  { en: "Eternal", fa: "ابدیت" },
  { en: "Silent", fa: "خاموش" },
  { en: "Thunder", fa: "رعد" },
  { en: "Blood", fa: "خون" },
  { en: "Frozen", fa: "یخ‌زده" },
  { en: "Sacred", fa: "مقدس" },
  { en: "Mystic", fa: "مرموز" },
  { en: "Silver", fa: "نقره‌ای" },
  { en: "Fallen", fa: "ساقط‌شده" },
  { en: "Darkness", fa: "تاریکی" },
];

const suffixes = [
  { en: "Saga", fa: "حماسه" },
  { en: "Chronicles", fa: "روایت‌ها" },
  { en: "Monogatari", fa: "داستان" },
  { en: "No Yūsha", fa: "قهرمان" },
  { en: "Shippuden", fa: "شپودن" },
  { en: "Kaisen", fa: "نبرد" },
  { en: "Tensei", fa: "تناسخ" },
  { en: "Requiem", fa: "مرثیه" },
  { en: "Densetsu", fa: "افسانه" },
  { en: "Zetsubou", fa: "ناامیدی" },
  { en: "Meikyuu", fa: "هزارتو" },
  { en: "Seisen", fa: "جنگ مقدس" },
  { en: "Shinsei", fa: "احیا" },
  { en: "Tsubasa", fa: "بال‌ها" },
  { en: "Kizuna", fa: "پیوند" },
  { en: "Ragnarok", fa: "آخرالزمان" },
  { en: "Eiyuu", fa: "قهرمان" },
  { en: "Yami", fa: "تاریکی" },
  { en: "Sensou", fa: "جنگ" },
  { en: "Gekitou", fa: "نبرد شدید" },
];

const PRODUCTS_NUMBER = 200;

function getRandomUniqueWords() {
  const nameWordsNumber = randomInt({ max: 5 });
  const nameWords: { en: string; fa: string }[] = [];

  let localWords = [...words];

  for (let k = 0; k < nameWordsNumber; k++) {
    const randomWordIndex = randomIndex({ max: localWords.length });
    const randomWord = localWords[randomWordIndex];
    nameWords.push(randomWord);

    localWords = localWords.filter((word) => word.en !== randomWord.en);
  }

  return nameWords;
}

async function createProductsSeedFunction(prisma: PrismaClient) {
  const [managers, tags, statuses, categories] = await Promise.all([
    prisma.user.findMany({ where: { roles: { has: "manager" } } }),
    prisma.tag.findMany(),
    prisma.productStatus.findMany(),
    prisma.category.findMany(),
  ]);

  const managersLength = managers.length;
  const tagsLength = tags.length;
  const statusesLength = statuses.length;
  const categoriesLength = categories.length;

  const productImageSeeds = await fs.readdir(
    path.join(__dirname, "../../public/seed/productImage")
  );

  const productImageSeedsLength = productImageSeeds.length;

  const promises: Promises = [];
  for (let i = 0; i < PRODUCTS_NUMBER; i++) {
    const data: Partial<Prisma.ProductCreateInput> = {};

    data.category = {
      connect: {
        id: categories[randomIndex({ max: categoriesLength })].id,
      },
    };
    data.status = {
      connect: {
        id: statuses[randomIndex({ max: statusesLength })].id,
      },
    };
    data.manager = {
      connect: {
        id: managers[randomIndex({ max: managersLength })].id,
      },
    };

    const tagNumbers = randomInt({ max: tagsLength });
    const tagsId: { id: string }[] = [];

    for (let j = 0; j < tagNumbers; j++) {
      tagsId.push({ id: tags[randomIndex({ max: tagsLength })].id });
    }

    data.tags = { connect: tagsId };
    data.designer = faker.person.fullName();
    data.writer = faker.person.fullName();

    const nameWords = getRandomUniqueWords();

    const randomSuffix = suffixes[randomIndex({ max: suffixes.length })];

    const name =
      nameWords.map((word) => word.en).join(" ") + ` ${randomSuffix.en}`;
    const persianName =
      nameWords.map((word) => word.fa).join(" ") + ` ${randomSuffix.fa}`;

    data.name = name;
    data.persianName = persianName;

    data.priceInRials = parseInt(
      faker.commerce.price({ min: 1000, max: 30000 })
    );
    data.releaseYear = randomInt({ min: 2010, max: 2024 });

    const randomImagePath =
      productImageSeeds[randomIndex({ max: productImageSeedsLength })];

    data.productImage = `seed/productImage/${randomImagePath}`;
    data.slug = faker.word
      .words({ count: { min: 2, max: 6 } })
      .split(" ")
      .join("-");
    data.summary = faker.word.words(randomInt({ min: 25, max: 50 }));
    data.createdAt = randomDate();

    promises.push(
      prisma.product.create({ data: data as Prisma.ProductCreateInput })
    );
  }

  await Promise.all(promises);
}

async function deleteProductsSeedFunction(prisma: PrismaClient) {
  await prisma.product.deleteMany();
}

export const deleteProducts = createSeed(deleteProductsSeedFunction);
export const createProducts = createSeed(createProductsSeedFunction);
