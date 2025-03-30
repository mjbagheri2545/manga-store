const fs = require("fs/promises");
const path = require("path");
const createControllers = require("./createControllers");
const createConstants = require("./createConstants");
const createRouter = require("./createRouter");
const createValidators = require("./createValidators");
const createLib = require("./createLib");
const createServices = require("./createServices");

async function createFeature() {
  try {
    const name = process.env.npm_config_name;
    const noServices = process.env.npm_config_noservices === "true";
    const noLib = process.env.npm_config_nolib === "true";

    if (name == null) {
      const errorMessage = `
        You must provide a name like this: npm run create-feature --name=invoice --noServices(optional,  default=false) --noLib(optional, default=false)
      `;

      throw new Error(errorMessage);
    }

    const capitalizedName = name[0].toUpperCase() + name.slice(1);
    const upperCasedName = name.toUpperCase();
    const featureDirPath = path.join(__dirname, `../../src/router/${name}`);

    await fs.mkdir(featureDirPath);

    const creatorsArgs = [
      featureDirPath,
      name,
      capitalizedName,
      upperCasedName,
    ];

    const promises = [
      createControllers(...creatorsArgs),
      createConstants(...creatorsArgs),
      createRouter(...creatorsArgs),
      createValidators(featureDirPath, capitalizedName),
    ];

    if (!noServices) {
      promises.push(createServices(featureDirPath, name, capitalizedName));
    }

    if (!noLib) {
      promises.push(createLib(featureDirPath, capitalizedName, upperCasedName));
    }

    // i use try catch because eslint throw error during fix
    try {
      await Promise.all([
        promisifiedExec(
          `npx eslint "${featureDirPath}" --fix --rule "simple-import-sort/imports: error"`
        ),
        promisifiedExec(`npx prettier "${featureDirPath}" --write`),
      ]);
    } catch (error) {}

    await Promise.all(promises);
    console.log(`Feature '${name}' created successfully!`);
  } catch (error) {
    console.error(error.message);
  }
}

createFeature();
