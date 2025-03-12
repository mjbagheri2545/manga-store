const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

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
  // path.resolve because project names may have space
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

  // i use try catch because eslint throw error during fix
  try {
    await Promise.all([
      promisifiedExec(
        `npx eslint "${featureDirPath}" --fix --rule "simple-import-sort/imports: error"`
      ),
      promisifiedExec(`npx prettier "${featureDirPath}" --write`),
    ]);
  } catch (error) {}
}

createFeature();
