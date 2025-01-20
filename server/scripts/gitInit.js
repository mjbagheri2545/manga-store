const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const promisifiedExec = promisify(exec);

async function gitInit() {
  try {
    await promisifiedExec("git rev-parse --is-inside-work-tree", {
      stdio: "ignore",
    });
    console.log("Git is already initialized.");
  } catch {
    console.log("Git is not initialized. Initializing now...");

    const projectDir = path.join(__dirname, "../../")
    await promisifiedExec(`cd ${projectDir} && git init`);

    console.log("Git initialized successfully.");
  }
}

module.exports = gitInit;
