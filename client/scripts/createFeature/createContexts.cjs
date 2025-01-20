const fs = require("fs/promises");

async function createContexts(featureDirPath, name,capitalizedName) {
  const contextsDirPath = `${featureDirPath}/contexts`;
  await fs.mkdir(contextsDirPath);

  const contextPath = `${contextsDirPath}/index.ts`;
  const contextData = `
    import { createContext } from "react";

    import { useContextValue } from "@/hooks";
    import { ${capitalizedName} } from "@/types";

    export type T${capitalizedName}Context = {
      ${name}: ${capitalizedName}
    };

    export const ${capitalizedName}Context = createContext<T${capitalizedName}Context | null>(null);

    export function use${capitalizedName}() {
      return useContextValue(${capitalizedName}Context);
    }
  `;

  await fs.writeFile(contextPath, contextData);
}

module.exports = createContexts;
