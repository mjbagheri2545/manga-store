const fs = require("fs/promises");

async function createServices(featureDirPath, name, capitalizedName) {
  const servicesDirPath = `${featureDirPath}/services`;
  await fs.mkdir(servicesDirPath);

  const servicePath = `${servicesDirPath}/index.ts`;
  const serviceData = `
    import { Prisma } from "@prisma/client";

    import { prisma } from "@/lib/prisma";

    type Create${capitalizedName}Options = {
        data: Prisma.${capitalizedName}CreateInput
    };

    class ${capitalizedName}Service {
      getAll() {
        return prisma.${name}.findMany();
      }

      getById(id: string) {
        return prisma.${name}.findUnique({
          where: { id },
        });
      }

      create({ data }: Create${capitalizedName}Options) {
        return prisma.${name}.create({
          data: {
            ...data,
          },
        });
      }

      update(id: string, data: Prisma.${capitalizedName}UpdateInput = {}) {
        return prisma.${name}.update({ where: { id }, data });
      }

      delete(id: string) {
        return prisma.${name}.delete({ where: { id } });
      }
    }

    const ${name}Service = new ${capitalizedName}Service();

    export default ${name}Service;
      `;

  await fs.writeFile(servicePath, serviceData);
}

module.exports = createServices;
