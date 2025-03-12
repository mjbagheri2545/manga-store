import { fakerFA as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";
import { Promises } from "./types";
import { hashPassword, randomDate } from "./utils";

const MANAGERS_NUMBER = 10;

async function createManagersSeedFunction(prisma: PrismaClient) {
  const promises: Promises = [];
  for (let i = 0; i < MANAGERS_NUMBER; i++) {
    const data: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      password: await hashPassword(faker.internet.password()),
      isVerified: true,
      roles: { set: ["user", "manager"] },
      avatarImage: faker.image.personPortrait(),
      createdAt: randomDate(),
    };

    promises.push(prisma.user.create({ data }));
  }

  await Promise.all(promises);
}

async function deleteManagersSeedFunction(prisma: PrismaClient) {
  await prisma.user.deleteMany({ where: { roles: { has: "manager" } } });
}

export const deleteManagers = createSeed(deleteManagersSeedFunction);
export const createManagers = createSeed(createManagersSeedFunction);
