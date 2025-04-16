const fs = require("fs/promises");

async function createConstants(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName
) {
  const constantsDirPath = `${featureDirPath}/constants`;
  await fs.mkdir(constantsDirPath);

  const globalPath = `${constantsDirPath}/global.ts`;
  const globalData = `
  import { ${capitalizedName}, Prisma } from "@prisma/client"
  import { createLogger } from "@/utils";

  export const ${name}Logger = createLogger({ fileName: "features/${name}" });

  export type ${capitalizedName}Base = ${capitalizedName}
  export const ${upperCasedName}_BASE_SELECT: Prisma.${capitalizedName}Select = {
      id: true,
      createdAt:true,
    }

  export const PERMISSION_${upperCasedName}_SELECT: Prisma.${capitalizedName}Select = {
      id: true
  }
  `;

  await fs.writeFile(globalPath, globalData);
}

module.exports = createConstants;
