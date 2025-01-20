const fs = require("fs/promises");

async function createControllers(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName
) {
  const controllersDirPath = `${featureDirPath}/controllers`;
  await fs.mkdir(controllersDirPath);

  const controllerPath = `${controllersDirPath}/index.ts`;
  const controllerData = `
    import { Response } from "express";

    import { Prisma, ${capitalizedName} } from "@prisma/client";

    import SHARED_MESSAGES from "@/constants/messages";
    import { UserAuthorizedReq } from "@/types";

    import {  successfulResponse } from "@/utils";

    import ${name}Logger from "../constants/logger";
    import ${upperCasedName}_MESSAGES from "../constants/messages";
    import ${name}Service from "../services"

    type Get${capitalizedName}Req = UserAuthorizedReq<{${name}: ${capitalizedName}}>

    type Create${capitalizedName}ReqBody = {}
    type Create${capitalizedName}Req = UserAuthorizedReq<Create${capitalizedName}ReqBody>

    type Update${capitalizedName}ReqBody = Partial<Create${capitalizedName}ReqBody>
     & {${name}: ${capitalizedName}};
    type Update$${capitalizedName}Req = UserAuthorizedReq<Update${capitalizedName}ReqBody>

    class ${capitalizedName}Controller {
        async getAll${capitalizedName}s(req: UserAuthorizedReq, res: Response) {

        const ${name}s = await ${name}Service.getAll()

        successfulResponse({res, data: {${name}s }})
        }

        get${capitalizedName}(req: Get${capitalizedName}Req, res: Response) {
          const {${name}} = req.body

          successfulResponse({res, data: {${name} }})
        }

        async create${capitalizedName}(req: Create${capitalizedName}Req, res: Response) {


          const ${name} = await ${name}Service.create();

          ${name}Logger.info("${capitalizedName} created.", ${name});

          const { create: createMessage } = SHARED_MESSAGES.features.crud;

          const message = createMessage(${upperCasedName}_MESSAGES.crud(${name}));

          successfulResponse({ res, message });
        }

        async update${capitalizedName}(req: Update$${capitalizedName}Req, res: Response) {
          const { ${name} } = req.body


          const data: Prisma.ProductUpdateInput = {
          }

          const updated${capitalizedName} = await ${name}Service.update(${name}.id, data);

          ${name}Logger.info("${capitalizedName} created.", {
            old${capitalizedName}: ${name},
            updated${capitalizedName}
          });

          const { update: updateMessage } = SHARED_MESSAGES.features.crud;

          const message = updateMessage(${upperCasedName}_MESSAGES.crud(updated${capitalizedName}));

          successfulResponse({ res, message });
        }
    }

    export default ${capitalizedName}Controller;
    `;

  await fs.writeFile(controllerPath, controllerData);
}

module.exports = createControllers;
