const fs = require("fs/promises");

async function createConstants(featureDirPath, name, capitalizedName,upperCasedName) {
  const constantsDirPath = `${featureDirPath}/constants`;
  await fs.mkdir(constantsDirPath)

  const loggerPath = `${constantsDirPath}/logger.ts`;
  const loggerData = `
    import { createLogger } from "@/utils";

    const ${name}Logger = createLogger({ fileName: "features/${name}" });

    export default ${name}Logger;
    `;

  const messagesPath = `${constantsDirPath}/messages.ts`;
  const messagesData = `
    import { ${capitalizedName} } from "@prisma/client";

    const ${upperCasedName}_MESSAGES = {
      crud: (${name}: ${capitalizedName}) => '',
    };

    export default ${upperCasedName}_MESSAGES;
  `;

  await Promise.all([
    fs.writeFile(loggerPath, loggerData),
    fs.writeFile(messagesPath, messagesData),
  ]);
}

module.exports = createConstants;
