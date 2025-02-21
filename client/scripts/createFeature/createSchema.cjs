const fs = require("fs/promises");

async function createSchema(featureDirPath, capitalizedName, upperCasedName) {
  const schemaDirPath = `${featureDirPath}/schema`;
  await fs.mkdir(schemaDirPath);

  const schemaPath = `${schemaDirPath}/index.ts`;
  const schemaData = `
    import { z } from "zod";

    const create${capitalizedName}Schema = z.object({});

    export type Create${capitalizedName}Data = z.infer<typeof create${capitalizedName}Schema>
  `;

  await fs.writeFile(schemaPath, schemaData);
}

module.exports = createSchema;
