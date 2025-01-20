const fs = require("fs/promises");

async function createSchema(featureDirPath, capitalizedName, upperCasedName) {
  const schemaDirPath = `${featureDirPath}/schema`;
  await fs.mkdir(schemaDirPath);

  const schemaPath = `${schemaDirPath}/index.ts`;
  const schemaData = `
    import { z } from "zod";

    function create${capitalizedName}Schema(){
        const schema = z.object({})

        return { schema }
    }

    const ${upperCasedName}_SCHEMA = create${capitalizedName}Schema();

    export default ${upperCasedName}_SCHEMA;
  `;

  await fs.writeFile(schemaPath, schemaData);
}

module.exports = createSchema;
