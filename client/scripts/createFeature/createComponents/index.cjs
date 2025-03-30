const fs = require("fs/promises");
const path = require("path");
const createProvider = require("./createProvider.cjs");
const createCrudComponents = require("./createCrudComponents/index.cjs");
const createAdminPages = require("./createAdminPages/index.cjs");

async function createComponents(
  featureDirPath,
  name,
  capitalizedName,
  upperCasedName,
  entityName
) {
  const componentsDirPath = `${featureDirPath}/components`;
  const crudComponentsDirPath = `${componentsDirPath}/crud`;
  await fs.mkdir(crudComponentsDirPath, { recursive: true });

  const adminPagesDirPath = path.join(
    __dirname,
    `../../../src/pages/admin/items/${name}`
  );

  // for easily overwrite existing feature admin pages
  try {
    await fs.access(adminPagesDirPath);
    console.log(`${name} feature admin pages directory is already available`);

    try {
      console.log(`recreating ${name} feature admin pages directory`);
      await fs.rm(adminPagesDirPath, { recursive: true });
      await fs.mkdir(adminPagesDirPath);
    } catch (rmError) {
      console.error(
        `Error in removing ${name} feature admin pages directory:`,
        rmError
      );
    }
  } catch (accessError) {
    if (accessError?.code === "ENOENT") {
      await fs.mkdir(adminPagesDirPath);
    } else {
      throw accessError;
    }
  }

  const promises = [];

  promises.push(
    createProvider(componentsDirPath, name, capitalizedName, entityName)
  );
  promises.push(
    createCrudComponents(
      crudComponentsDirPath,
      name,
      capitalizedName,
      upperCasedName,
      entityName
    )
  );
  promises.push(
    createAdminPages(adminPagesDirPath, name, capitalizedName, entityName)
  );

  await Promise.all(promises);
}

module.exports = createComponents;
