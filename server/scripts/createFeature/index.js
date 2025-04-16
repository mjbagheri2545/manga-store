const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

const createControllers = require("./createControllers");
const createConstants = require("./createConstants");
const createRouter = require("./createRouter");
const createValidators = require("./createValidators");
const createLib = require("./createLib");
const createServices = require("./createServices");
const createUtils = require("./createUtils");

async function createFeature() {
  const name = process.env.npm_config_name;
  const entityName = process.env.npm_config_entityname;

  if (name == null || entityName == null) {
    const errorMessage = `
        You must provide a name like this: npm run create-feature --name=invoice --entityName="محصول"
      `;

    throw new Error(errorMessage);
  }

  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const upperCasedName = name.toUpperCase();
  const featureDirPath = path.join(__dirname, `../../src/router/${name}`);

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

  const commonArgs = [featureDirPath, name, capitalizedName, upperCasedName];

  const promises = [
    createControllers(...commonArgs, entityName),
    createConstants(...commonArgs),
    createRouter(...commonArgs, entityName),
    createValidators(featureDirPath, capitalizedName),
    createUtils(featureDirPath, name, capitalizedName),
    createServices(featureDirPath, name, capitalizedName, upperCasedName),
    createLib(featureDirPath, capitalizedName, upperCasedName),
  ];

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

  console.log(`Feature '${name}' created successfully!`);
}

createFeature();
