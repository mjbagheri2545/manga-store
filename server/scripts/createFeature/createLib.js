const fs = require("fs/promises");

async function createLib(
  featureDirPath,
  capitalizedName,
  upperCasedName
) {
  const libDirPath = `${featureDirPath}/lib`;
  await fs.mkdir(libDirPath);

  const permissionsPath = `${libDirPath}/permissions.ts`;
  const permissionsData = `
    import { ${capitalizedName}, User } from "@prisma/client"; 

    import { Permissions, PermissionsAction } from "@/types";
    import { hasPermission } from "@/utils";    

    const ${upperCasedName}_PERMISSIONS = {
      admin: { view: true, create: true, update: true, delete: true },
      manager: {
        view: true,
        create: false,
        update: false,
        delete:false,
      },
      translator: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },
      user: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },
    } as const satisfies Permissions<${capitalizedName}>;  

    export function has${capitalizedName}Permission(
      user: User,
      action: PermissionsAction,
      data?: ${capitalizedName}
    ) {
      return hasPermission(user, ${upperCasedName}_PERMISSIONS, action, data);
    }
      `;

  await fs.writeFile(permissionsPath, permissionsData);
}

module.exports = createLib;
