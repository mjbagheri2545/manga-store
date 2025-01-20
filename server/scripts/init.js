const gitInit = require("./gitInit");
const huskyInit = require("./huskyInit");

async function init() {
  await gitInit();
  await huskyInit();
}

init();
