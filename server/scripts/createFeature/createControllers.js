const fs = require("fs/promises");

async function createControllers(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName,
  entityName
) {
  const controllersDirPath = `${featureDirPath}/controllers`;
  await fs.mkdir(controllersDirPath);

  const controllerPath = `${controllersDirPath}/index.ts`;
  const controllerData = `
    import { Response } from "express";

    import { Prisma } from "@prisma/client";

    import SHARED_MESSAGES from "@/constants/messages";
    import { UserAuthorizedReq, PaginateQueryWithSort, EmptyObject } from "@/types";
    import {  successfulResponse } from "@/utils";

    import { ${name}Logger } from "../constants/global";
    import ${name}Service from "../services"
    import { ${capitalizedName}Base } from "../types"
    import { ${name}LoggerData } from "../utils"

    type GetAll${capitalizedName}sReq = UserAuthorizedReq<
    EmptyObject,
    PaginateQueryWithSort
    >;

    type Get${capitalizedName}Req = UserAuthorizedReq<{${name}: ${capitalizedName}Base}>

    type Create${capitalizedName}ReqBody = {}
    type Create${capitalizedName}Req = UserAuthorizedReq<Create${capitalizedName}ReqBody>

    type Update${capitalizedName}ReqBody = Partial<Create${capitalizedName}ReqBody>
     & {${name}: ${capitalizedName}Base };
    type Update$${capitalizedName}Req = UserAuthorizedReq<Update${capitalizedName}ReqBody>

    class ${capitalizedName}Controller {
        async getAll${capitalizedName}s(req: GetAll${capitalizedName}sReq, res: Response) {
        const [${name}s, count] = await ${name}Service.getAll(req.query)

        successfulResponse({res, data: {${name}s, count }})
        }

        get${capitalizedName}(req: Get${capitalizedName}Req, res: Response) {
          const {${name}} = req.body

          successfulResponse({res, data: {${name} }})
        }

        async create${capitalizedName}(req: Create${capitalizedName}Req, res: Response) {
          const ${name} = await ${name}Service.create();

          ${name}Logger.logMessage("${capitalizedName} created.", {
            metaData: ${name}LoggerData(${name})
          });

          const { create: createMessage } = SHARED_MESSAGES.crud;

          successfulResponse({ res, message: createMessage("${entityName}"), data: {id: ${name}.id } });
        }

        async update${capitalizedName}(req: Update$${capitalizedName}Req, res: Response) {
          const { ${name} } = req.body


          const data: Prisma.ProductUpdateInput = {
          }

          const updated${capitalizedName} = await ${name}Service.update(${name}.id, data);

          ${name}Logger.info("${capitalizedName} updated.", {
            metaData: {
            old: ${name}LoggerData(${name}),
            new: ${name}LoggerData(updated${capitalizedName})
            }
          });

          const { update: updateMessage } = SHARED_MESSAGES.crud;

          successfulResponse({ res, message: updateMessage("${entityName}"), data: {id: updated${capitalizedName}.id} });
        }
    }

    export default ${capitalizedName}Controller;
    `;

  await fs.writeFile(controllerPath, controllerData);
}

module.exports = createControllers;
