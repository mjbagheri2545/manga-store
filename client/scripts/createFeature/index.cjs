const fs = require("fs/promises");
const path = require("path");

const createComponents = require("./createComponents.cjs");
const createApi = require("./createApi.cjs");
const createContexts = require("./createContexts.cjs");
const createHooks = require("./createHooks.cjs");
const createSchema = require("./createSchema.cjs");
const createLib = require("./createLib.cjs");

async function createFeature() {
  const name = process.env.npm_config_name;
  const noLib = process.env.npm_config_nolib === "true";

  if (name == null) {
    const errorMessage = `
      You must provide a name like this: npm run create-feature --name=invoice --noLib(optional, default=false)
    `;

    throw new Error(errorMessage);
  }

  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const upperCasedName = name.toUpperCase();
  const featureDirPath = path.join(__dirname, `../../src/features/${name}`);

  await fs.mkdir(featureDirPath);

  const promises = [];

  promises.push(createApi(featureDirPath, name, capitalizedName));
  promises.push(createComponents(featureDirPath, capitalizedName));
  promises.push(createContexts(featureDirPath, name, capitalizedName));
  promises.push(createSchema(featureDirPath, capitalizedName, upperCasedName));
  promises.push(createHooks(featureDirPath, capitalizedName));

  if (!noLib) {
    promises.push(createLib(featureDirPath, capitalizedName, upperCasedName));
  }

  await Promise.all(promises);
}

createFeature();
