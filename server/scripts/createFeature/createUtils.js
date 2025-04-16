const fs = require("fs/promises");

async function createUtils(featureDirPath, name, capitalizedName) {
  const utilsDirPath = `${featureDirPath}/utils`;
  await fs.mkdir(utilsDirPath);

  const utilsPath = `${utilsDirPath}/index.ts`;
  const utilsData = `
    import { ${capitalizedName}Base } from "../types";

    import {  pick  } from "@/utils";

    export function ${name}LoggerData(${name}: ${capitalizedName}Base) {
        return pick(${name}, ["id"])
    }
  `;

  await fs.writeFile(utilsPath, utilsData);
}

module.exports = createUtils;
