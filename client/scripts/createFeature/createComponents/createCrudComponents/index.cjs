const createCrudTable = require("./createCrudTable.cjs");
const createInfo = require("./createInfo.cjs");
const createFormFields = require("./createFormFields.cjs");
const createInfoItems = require("./createInfoItems.cjs");
const createCreateForm = require("./createCreateForm.cjs");
const createUpdateForm = require("./createUpdateForm.cjs");

async function createCrudComponents(
  crudComponentsDirPath,
  name,
  capitalizedName,
  upperCasedName,
  entityName
) {
  const promises = [];
  const commonCrudArgs = [crudComponentsDirPath, name, capitalizedName];

  promises.push(createCrudTable(...commonCrudArgs));
  promises.push(createInfo(...commonCrudArgs, upperCasedName));
  promises.push(createFormFields(...commonCrudArgs));
  promises.push(
    createInfoItems(crudComponentsDirPath, capitalizedName, upperCasedName)
  );
  promises.push(createCreateForm(...commonCrudArgs,entityName));
  promises.push(createUpdateForm(...commonCrudArgs,entityName));

  await Promise.all(promises);
}

module.exports = createCrudComponents;
