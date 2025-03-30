import { PrismaClient } from "@prisma/client";

import createSeed from "../createSeed";
import { createManagers } from "./manager";
import { createNormalUsers } from "./normalUser";
import { createTranslators } from "./translator";

async function deleteUsersSeedFunction(prisma: PrismaClient) {
  console.log("Deleting Users ...");
  await prisma.user.deleteMany();
}

export const deleteUsers = createSeed(deleteUsersSeedFunction);

export function createUsers() {
  return Promise.all([
    createManagers(),
    createTranslators(),
    createNormalUsers(),
  ]);
}
