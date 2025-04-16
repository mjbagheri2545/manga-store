const fs = require("fs/promises");

async function createRouter(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName,
  entityName
) {
  const routerDirPath = `${featureDirPath}/router`;
  await fs.mkdir(routerDirPath);

  const routerPath = `${routerDirPath}/index.ts`;
  const routerData = `
    import { Router } from "express";

    import { Permission${capitalizedName} } from "@/types"
    import SHARED_MESSAGES from "@/constants/messages";
    import {
      deleteEntity,
      hasGeneralPermission,
      hasSpecificPermission,
      idAuthorization,
      jwtAuthorization,
    } from "@/middlewares";
    import { slugValidation } from "@/validators";

    import { ${name}Logger, ${upperCasedName}_BASE_SELECT, PERMISSION_${upperCasedName}_SELECT } from "../constants/global";
    import ${capitalizedName}Controller from "../controllers";
    import { has${capitalizedName}Permission } from "../lib/permissions";
    import ${name}Service, {
      Get${capitalizedName}ByIdOptions,
    } from "../services";
    import ${capitalizedName}Validator from "../validators";
    import { ${name}LoggerData } from "../utils";
    import { ${capitalizedName}Base } from "../types";

    function create${capitalizedName}Router() {
      const router = Router();

      const { getAll${capitalizedName}s, get${capitalizedName}, create${capitalizedName}, update${capitalizedName} } =
        new ${capitalizedName}Controller();

      const { create${capitalizedName}Validation, update${capitalizedName}Validation } = new ${capitalizedName}Validator();

      router.get(
        "/",
        jwtAuthorization,
        getAll${capitalizedName}s
      );

      const createGet${capitalizedName}ById =(options?: Get${capitalizedName}ByIdOptions) => idAuthorization({
        entityKey: "${name}",
        getByIdQuery: (id) => ${name}Service.getById(id, options),
      });

      router.get(
        "/:id",
        slugValidation(),
        jwtAuthorization,
        createGet${capitalizedName}ById({ select: ${upperCasedName}_BASE_SELECT }),
        get${capitalizedName}
      );

        const createPermission = hasGeneralPermission((user) =>
          has${capitalizedName}Permission(user, "create")
        );

      router.post(
        "/",
        create${capitalizedName}Validation(),
        jwtAuthorization,
        createPermission,
        create${capitalizedName}
      );

      const updatePermission = hasSpecificPermission<Permission${capitalizedName}>({
        entityKey: "${name}",
        hasPermission: (user, ${name}) =>
          has${capitalizedName}Permission(user, "update", ${name}),
      });

      router.put(
        "/:id",
        update${capitalizedName}Validation(),
        jwtAuthorization,
        createGet${capitalizedName}ById({select: ${upperCasedName}_BASE_SELECT }),
        updatePermission,
        update${capitalizedName}
      );

      function delete${capitalizedName}Message(${name}: ${capitalizedName}Base) {
        const { delete: deleteMessage } = SHARED_MESSAGES.crud;
        ${name}Logger.logMessage("${capitalizedName} deleted.", {metaData: ${name}LoggerData(${name}) });

        return deleteMessage("${entityName}");
      }

      const delete${capitalizedName} = deleteEntity<${capitalizedName}Base, Permission${capitalizedName}>({
        delete: ${name}Service.delete,
        entityKey: "${name}",
        hasPermission: (user, ${name}) =>
          has${capitalizedName}Permission(user, "delete", ${name}),
        message: delete${capitalizedName}Message,
      });

      router.delete(
        "/:id",
        slugValidation(),
        jwtAuthorization,
        createGet${capitalizedName}ById({ select: PERMISSION_${upperCasedName}_SELECT }),
        delete${capitalizedName}
      );

      return router;
    }

    export default create${capitalizedName}Router;
  `;

  await fs.writeFile(routerPath, routerData);
}

module.exports = createRouter;
