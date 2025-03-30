const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

const createCreatePage = require("./createCreatePage.cjs");
const createUpdatePage = require("./createUpdatePage.cjs");
const createTablePage = require("./createTablePage.cjs");
const createInfoPage = require("./createInfoPage.cjs");
const createPageHeader = require("./createPageHeader.cjs");

async function createAdminPages(...args) {
  const promises = [];

  promises.push(createCreatePage(...args));
  promises.push(createUpdatePage(...args));
  promises.push(createTablePage(...args));
  promises.push(createInfoPage(...args));
  promises.push(createPageHeader(...args));

  await Promise.all(promises);

  // i use try catch because eslint throw error during fix
  try {
    await Promise.all([
      promisifiedExec(
        `npx eslint "${adminPagesDirPath}" --fix --rule "simple-import-sort/imports: error"`
      ),
      promisifiedExec(`npx prettier "${adminPagesDirPath}" --write`),
    ]);
  } catch (error) {}
}

module.exports = createAdminPages;
