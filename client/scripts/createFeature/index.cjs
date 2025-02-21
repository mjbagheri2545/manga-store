const fs = require("fs/promises");
const path = require("path");

const createComponents = require("./createComponents.cjs");
const createApi = require("./createApi.cjs");
const createContexts = require("./createContexts.cjs");
const createHooks = require("./createHooks.cjs");
const createSchema = require("./createSchema.cjs");

async function createFeature() {
  const name = process.env.npm_config_name;

  if (name == null) {
    const errorMessage = `
      You must provide a name like this: npm run create-feature --name=invoice
    `;

    throw new Error(errorMessage);
  }

  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const upperCasedName = name.toUpperCase();
  const featureDirPath = path.join(__dirname, `../../src/features/${name}`);

  await fs.mkdir(featureDirPath);

  const promises = [];

  const commonArgs = [featureDirPath, name, capitalizedName];

  promises.push(createApi(...commonArgs));
  promises.push(createComponents(featureDirPath, capitalizedName));
  promises.push(createContexts(...commonArgs));
  promises.push(createSchema(featureDirPath, capitalizedName, upperCasedName));
  promises.push(createHooks(...commonArgs));

  await Promise.all(promises);
}

createFeature();
