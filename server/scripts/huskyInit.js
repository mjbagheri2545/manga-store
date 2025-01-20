const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

async function waitForFile(filePath, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  return false;
}

async function huskyInit() {
  try {
    console.log("Initializing husky");
    await promisifiedExec("npx husky init");

    const preCommitPath = path.join(__dirname, "../.husky/pre-commit");

    const preCommitCommands = [
      " cd server",
      "npm run pre:commit",
      "cd ../client",
      "npm run pre:commit",
    ];

    const promises = [];

    promises.push(
      fs.writeFile(preCommitPath, preCommitCommands.join("|| exit 1\n"))
    );

    const packageJsonPath = path.join(__dirname, "../package.json");

    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
    delete packageJson.scripts.prepare;
    packageJson.scripts["husky:prepare"] = "cd .. && husky server/.husky";

    promises.push(
      fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
    );

    await Promise.all(promises);

    console.log("Preparing husky");
    await promisifiedExec("npm run husky:prepare");
  } catch (error) {
    console.error(error);
  }
}

module.exports = huskyInit
