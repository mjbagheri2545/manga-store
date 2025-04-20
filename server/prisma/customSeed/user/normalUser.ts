import { fakerFA as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { hashPassword, randomDate, randomInt } from "../utils";

const NORMAL_USERS_COUNT = 150;

async function createNormalUsersSeedFunction(prisma: PrismaClient) {
  console.log("Creating Normal Users ...");
  for (let i = 0; i < NORMAL_USERS_COUNT; i++) {
    const data: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      password: await hashPassword(faker.internet.password()),
      isVerified: Math.random() > 0.5,
      roles: { set: ["user"] },
      avatarImage: faker.image.personPortrait(),
      createdAt: randomDate(),
      bio: faker.person.bio(),
      walletBalanceInToman: randomInt({ max: 500_000 }),
    };

    await prisma.user.create({ data });
  }

  // testing user for development
  await prisma.user.create({
    data: {
      email: "javadbagheri25452545@gmail.com",
      fullName: "Mohammad Javad Bagheri",
      password: await hashPassword("devPassword"),
      isVerified: true,
      roles: { set: ["user", "admin"] },
      bio: "development user for testing application",
      avatarImage: "seed/profile.jfif",
      walletBalanceInToman: 1_000_000,
    },
  });
}

export const createNormalUsers = createSeed(createNormalUsersSeedFunction);
