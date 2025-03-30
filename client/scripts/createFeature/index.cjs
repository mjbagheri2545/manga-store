const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

const createComponents = require("./createComponents/index.cjs");
const createApi = require("./createApi.cjs");
const createContexts = require("./createContexts.cjs");
const createSchemas = require("./createSchemas.cjs");

async function createFeature() {
  const name = process.env.npm_config_name;
  const entityName = process.env.npm_config_entityname;

  if (name == null) {
    const errorMessage = `
      You must provide a name like this: npm run create-feature --name=user
    `;

    throw new Error(errorMessage);
  }

  if (entityName == null) {
    const errorMessage = `
    You must provide a entity name like this: npm run create-feature --name=user --entityName=کاربر
  `;

    throw new Error(errorMessage);
  }

  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const upperCasedName = name.toUpperCase();
  // path.resolve because project names may have space
  const featureDirPath = path.join(__dirname, `../../src/features/${name}`);

  // for easily overwrite existing feature
  try {
    await fs.access(featureDirPath);
    console.log(`${name} feature directory is already available`);

    try {
      console.log(`recreating ${name} feature directory`);
      await fs.rm(featureDirPath, { recursive: true });
      await fs.mkdir(featureDirPath);
    } catch (rmError) {
      console.error(`Error in removing ${name} feature directory:`, rmError);
    }
  } catch (accessError) {
    if (accessError?.code === "ENOENT") {
      await fs.mkdir(featureDirPath);
    } else {
      throw accessError;
    }
  }

  const promises = [];

  const commonArgs = [featureDirPath, name, capitalizedName];

  promises.push(createApi(...commonArgs));
  promises.push(createComponents(...commonArgs, upperCasedName, entityName));
  promises.push(createContexts(...commonArgs));
  promises.push(createSchemas(featureDirPath, capitalizedName));

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
