import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedFunction = (prismaClient: PrismaClient) => Promise<void>;

function createSeed(seedFunction: SeedFunction) {
  return async () => {
    try {
      await prisma.$connect();
      await seedFunction(prisma);
    } catch (error) {
      console.log(error);
    }

    await prisma.$disconnect();
  };
}

export default createSeed;
