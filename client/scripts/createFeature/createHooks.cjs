const fs = require("fs/promises");

async function createSchema(featureDirPath, capitalizedName) {
  const hooksDirPath = `${featureDirPath}/hooks`;
  await fs.mkdir(hooksDirPath);

  const methodsPath = `${hooksDirPath}/useCreate${capitalizedName}ContextValue.ts`;
  const methodsData = `
    import { T${capitalizedName}Context } from "../contexts"

    function useCreate${capitalizedName}ContextValue(): T${capitalizedName}Context {

      return {}
    } 

      export default useCreate${capitalizedName}ContextValue;
  `;

  await fs.writeFile(methodsPath, methodsData);
}

module.exports = createSchema;
