import { fakerFA as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { hashPassword, randomDate, randomInt } from "../utils";

const TRANSLATORS_COUNT = 30;

async function createTranslatorsSeedFunction(prisma: PrismaClient) {
  console.log("Creating Translators ...");
  for (let i = 0; i < TRANSLATORS_COUNT; i++) {
    const data: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      password: await hashPassword(faker.internet.password()),
      isVerified: true,
      roles: { set: ["user", "translator"] },
      avatarImage: faker.image.personPortrait(),
      createdAt: randomDate(),
      bio: faker.person.bio(),
      walletBalanceInToman: randomInt({ max: 500_000 }),
    };

    await prisma.user.create({ data });
  }
}

export const createTranslators = createSeed(createTranslatorsSeedFunction);
