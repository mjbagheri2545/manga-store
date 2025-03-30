const fs = require("fs/promises");

async function createApi(featureDirPath, name, capitalizedName) {
  const apiDirPath = `${featureDirPath}/api`;
  await fs.mkdir(apiDirPath);

  const apiPath = `${apiDirPath}/index.ts`;
  const apiData = `
    import PATH from "@/constants/path"
    import { HTTP } from "@/lib/http";
    import { ${capitalizedName} } from "@/types"
    import { Create${capitalizedName}Data } from "../schemas";
    import { CrudApi } from "@/utils";

    type ${capitalizedName}Response = {${name}: ${capitalizedName}}

    export type GetAll${capitalizedName}Base = ${capitalizedName}
    export type GetAll${capitalizedName}sResponse = {${name}s: GetAll${capitalizedName}Base[]}

    class ${capitalizedName}Api extends CrudApi<
        GetAll${capitalizedName}sResponse,
        ${capitalizedName}Response,
        Create${capitalizedName}Data
    > {
      constructor() {
        super("${name}")
      }
    }
    
    const ${name}Api = new ${capitalizedName}Api()

    export default ${name}Api;
  `;

  await fs.writeFile(apiPath, apiData);
}

module.exports = createApi;
