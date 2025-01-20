const fs = require("fs/promises");
const path = require("path");
const madge = require("madge");

async function graph() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  try {
    const rootDirList = await fs.readdir(path.join(__dirname, ".."));

    const graphDirPath = path.join(
      __dirname,
      `../dependencyGraphs/${year}-${month}-${day}`
    );

    if (!rootDirList.includes("../dependencyGraphs")) {
      await fs.mkdir(graphDirPath, { recursive: true });
    }

    const dayMillieSeconds = 86400 * 1000;
    const ms = date.getTime() % dayMillieSeconds;

    function getPath(folderName, pathName, ext) {
      return `${graphDirPath}/${folderName}/${pathName}-${ms}.${ext}`;
    }

    const madgeConfig = {
      tsConfig: path.join(__dirname, "../tsconfig.json"),
      fileExtensions: ["ts"],
      excludeRegExp: ["^node_modules"],
    };

    const depsRes = await madge(path.join(__dirname, "../src"), madgeConfig);

    const allDepsGraphData = await depsRes.dot();
    const circularDepsGraphData = await depsRes.dot(true);

    const promises = [];

    const graphDirList = await fs.readdir(graphDirPath);
    
    if (!graphDirList.includes("image")) {
      fs.mkdir(path.join(graphDirPath, "image"));
    }

    if (!graphDirList.includes("graph")) {
      fs.mkdir(path.join(graphDirPath, "graph"));
    }

    promises.push(depsRes.image(getPath("image", "allDeps", "svg")));
    promises.push(depsRes.image(getPath("image", "circularDeps", "svg"), true));

    promises.push(
      fs.writeFile(getPath("graph", "allDeps", "gv"), allDepsGraphData)
    );
    promises.push(
      fs.writeFile(
        getPath("graph", "circularDeps", "gv"),
        circularDepsGraphData
      )
    );

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}

graph();
