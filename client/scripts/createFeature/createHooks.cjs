const fs = require("fs/promises");

async function createSchema(featureDirPath, name, capitalizedName) {
  const hooksDirPath = `${featureDirPath}/hooks`;
  await fs.mkdir(hooksDirPath);

  const createContextValuePath = `${hooksDirPath}/useCreate${capitalizedName}ContextValue.ts`;
  const createContextValueData = `
    import ${name}Api from "../api";
    import { T${capitalizedName}Context } from "../contexts"

    function useCreate${capitalizedName}ContextValue(): T${capitalizedName}Context {

    const contextValue: T${capitalizedName}Context = {

    };

      return contextValue
    } 

    export default useCreate${capitalizedName}ContextValue;
  `;

  await fs.writeFile(createContextValuePath, createContextValueData);
}

module.exports = createSchema;
