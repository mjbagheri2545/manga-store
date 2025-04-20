import { fakerFA as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { hashPassword, randomDate, randomInt } from "../utils";

const MANAGERS_COUNT = 5;

async function createManagersSeedFunction(prisma: PrismaClient) {
  console.log("Creating Managers ...");
  for (let i = 0; i < MANAGERS_COUNT; i++) {
    const data: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      password: await hashPassword(faker.internet.password()),
      isVerified: true,
      roles: { set: ["user", "manager"] },
      avatarImage: faker.image.personPortrait(),
      createdAt: randomDate(),
      bio: faker.person.bio(),
      walletBalanceInToman: randomInt({ max: 500_000 }),
    };

    await prisma.user.create({ data });
  }

  await prisma.user.create({
    data: {
      email: "StevenKnight@gmail.com",
      fullName: "Steven Knight",
      password: await hashPassword("StevenKnightPassword"),
      avatarImage: "seed/profile.jfif",
      roles: ["user", "manager"],
      isVerified: true,
      walletBalanceInToman: 1_000_000,
      bio: `Steven Knight is a British screenwriter, producer, and director for film and television. He wrote the screenplays for the films Closed Circuit, Dirty Pretty Things, and Eastern Promises, and also wrote and directed the films Locke and Hummingbird (a.k.a. Redemption).`,
    },
  });
}

export const createManagers = createSeed(createManagersSeedFunction);
