const fs = require("fs/promises");

async function createApi(featureDirPath, name, capitalizedName) {
  const apiDirPath = `${featureDirPath}/api`;
  await fs.mkdir(apiDirPath);

  const apiPath = `${apiDirPath}/index.ts`;
  const apiData = `
    import PATH from "@/constants/path"
    import { HTTP } from "@/lib/http";
    import { ${capitalizedName} } from "@/types"
    import { Create${capitalizedName}Data } from "../schema";
    import { CrudApi } from "@/utils";

    type ${capitalizedName}Response = {${name}: ${capitalizedName}}

    type GetAll${capitalizedName}Response = {${name}s: ${capitalizedName}[]}

    class ${capitalizedName}Api extends CrudApi<
        GetAll${capitalizedName}Response,
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
