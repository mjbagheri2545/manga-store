const fs = require("fs/promises");

async function createServices(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName
) {
  const servicesDirPath = `${featureDirPath}/services`;
  await fs.mkdir(servicesDirPath);

  const servicePath = `${servicesDirPath}/index.ts`;
  const serviceData = `
    import { Prisma } from "@prisma/client";

    import { prisma } from "@/lib/prisma";
    import { PaginateQueryWithSort } from "@/types";
    import { parsePaginateQueryWithSort } from "@/utils";

    import { ${upperCasedName}_BASE_SELECT } from "../constants/global";

    type Create${capitalizedName}Options = {
      data: Prisma.${capitalizedName}CreateInput
    };

    export type Get${capitalizedName}ByIdOptions = Omit<Prisma.${capitalizedName}FindUniqueArgs, "where">;

    class ${capitalizedName}Service {
      getAll(query: PaginateQueryWithSort) {
        return Promise.all([prisma.${name}.findMany({...parsePaginateQueryWithSort(query),select: ${upperCasedName}_BASE_SELECT}), prisma.${name}.count()])
      }

      getById(id: string, options: Get${capitalizedName}ByIdOptions = {}) {
        return prisma.${name}.findUnique({
          where: { id },
          ...options,
        });
      }

      create({ data }: Create${capitalizedName}Options) {
        return prisma.${name}.create({
          data: {
            ...data,
          },
          select: {
            id: true
          }
        });
      }

      update(id: string, data: Prisma.${capitalizedName}UpdateInput = {}) {
        return prisma.${name}.update({ where: { id }, data, select: ${upperCasedName}_BASE_SELECT });
      }

      delete(id: string) {
        return prisma.${name}.delete({ where: { id }, select: ${upperCasedName}_BASE_SELECT });
      }
    }

    const ${name}Service = new ${capitalizedName}Service();

    export default ${name}Service;
      `;

  await fs.writeFile(servicePath, serviceData);
}

module.exports = createServices;
