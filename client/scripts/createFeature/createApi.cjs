const fs = require("fs/promises");

async function createApi(featureDirPath, name, capitalizedName) {
  const apiDirPath = `${featureDirPath}/api`;
  await fs.mkdir(apiDirPath);

  const apiPath = `${apiDirPath}/index.ts`;
  const apiData = `
    import PATH from "@/constants/path"
    import { HTTP } from "@/lib/http";
    import { ${capitalizedName} } from "@/types"

    type Get${capitalizedName}Response = {${name}: ${capitalizedName}}

    type GetAll${capitalizedName}Response = {${name}s: ${capitalizedName}[]}

    type Create${capitalizedName}Data = {}

    type Update${capitalizedName}Data = {}

    class ${capitalizedName}Api {
        getById(id: string) {
            return HTTP.get<Get${capitalizedName}Response>(PATH.${name}.id(id))
        }

        getAll() {
            return HTTP.get<GetAll${capitalizedName}Response>(PATH.${name}.index)
        }

        create${capitalizedName}(data: Create${capitalizedName}Data) {
            return HTTP.post(PATH.${name}.index, {data})
        }

        update${capitalizedName}(id: string, data: Update${capitalizedName}Data) {
            return HTTP.put(PATH.${name}.id(id), {data})
        }

        delete${capitalizedName}(id: string) {
            return HTTP.delete(PATH.${name}.id(id))
        }
    }

    const ${name}Api = new ${capitalizedName}Api()

    export default ${name}Api;
  `;

  await fs.writeFile(apiPath, apiData);
}

module.exports = createApi;
