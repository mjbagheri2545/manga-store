const fs = require("fs/promises");

async function createRouter(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName
) {
  const routerDirPath = `${featureDirPath}/router`;
  await fs.mkdir(routerDirPath);

  const routerPath = `${routerDirPath}/index.ts`;
  const routerData = `
    import { Router } from "express";

    import { ${capitalizedName} } from "@prisma/client";

    import SHARED_MESSAGES from "@/constants/messages";
    import {
      allResourcePermission,
      idAuthorization,
      jwtAuthorization,
      specificResourcePermission,
    } from "@/middlewares";
    import { deleteEntity } from "@/middlewares/features/crud.middleware";
    import { slugValidation } from "@/validators";

    import ${name}Logger from "../constants/logger";
    import ${upperCasedName}_MESSAGES from "../constants/messages";
    import ${capitalizedName}Controller from "../controllers";
    import { has${capitalizedName}Permission } from "../lib/permissions";
    import ${name}Service from "../services";
    import ${capitalizedName}Validator from "../validators";

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

      const get${capitalizedName}ById = idAuthorization({
        entityKey: "${name}",
        getByIdQuery: ${name}Service.getById,
      });

      router.get(
        "/:id",
        slugValidation(),
        jwtAuthorization,
        get${capitalizedName}ById,
        get${capitalizedName}
      );

        const createPermission = allResourcePermission((user) =>
          has${capitalizedName}Permission(user, "create")
        );

      router.post(
        "/",
        create${capitalizedName}Validation(),
        jwtAuthorization,
        createPermission,
        create${capitalizedName}
      );

      const updatePermission = specificResourcePermission<${capitalizedName}>({
        entityKey: "${name}",
        hasPermission: (user, ${name}) =>
          has${capitalizedName}Permission(user, "update", ${name}),
      });

      router.put(
        "/:id",
        update${capitalizedName}Validation(),
        jwtAuthorization,
        get${capitalizedName}ById,
        updatePermission,
        update${capitalizedName}
      );

      function delete${capitalizedName}Message(${name}: ${capitalizedName}) {
        const { delete: deleteMessage } = SHARED_MESSAGES.features.crud;
        ${name}Logger.info("${capitalizedName} deleted.", ${name});

        return deleteMessage(${upperCasedName}_MESSAGES.crud(${name}));
      }

      const delete${capitalizedName} = deleteEntity({
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
        get${capitalizedName}ById,
        delete${capitalizedName}
      );

      return router;
    }

    export default create${capitalizedName}Router;
  `;

  await fs.writeFile(routerPath, routerData);
}

module.exports = createRouter;
