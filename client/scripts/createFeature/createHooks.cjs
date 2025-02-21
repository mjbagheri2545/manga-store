const fs = require("fs/promises");

async function createSchema(featureDirPath, name, capitalizedName) {
  const hooksDirPath = `${featureDirPath}/hooks`;
  await fs.mkdir(hooksDirPath);

  const methodsPath = `${hooksDirPath}/useCreate${capitalizedName}ContextValue.ts`;
  const methodsData = `
    import ${name}Api from "../api";
    import { T${capitalizedName}Context } from "../contexts"

    function useCreate${capitalizedName}ContextValue(): T${capitalizedName}Context {

    const contextValue: T${capitalizedName}Context = {

    };

      return contextValue
    } 

    export default useCreate${capitalizedName}ContextValue;
  `;

  await fs.writeFile(methodsPath, methodsData);
}

module.exports = createSchema;
