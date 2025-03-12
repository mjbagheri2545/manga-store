const fs = require("fs/promises");

async function createComponents(featureDirPath, capitalizedName) {
  const componentsDirPath = `${featureDirPath}/components`;
  await fs.mkdir(componentsDirPath);

  const contextProviderComponentPath = `${componentsDirPath}/${capitalizedName}Provider.tsx`;
  const contextProviderComponentData = `
  import { PropsWithChildren } from "react";
  
  import { ${capitalizedName}Context } from "../contexts";
  import useCreateProductContextValue from "../hooks/useCreateProductContextValue";

  function ${capitalizedName}Provider({ children }: PropsWithChildren) {
    const contextValue = useCreate${capitalizedName}ContextValue();

    return <${capitalizedName}Context.Provider value={contextValue}>{children}</${capitalizedName}Context.Provider>;
  }
  
  export default ${capitalizedName}Provider;
  `;

  await fs.writeFile(
    contextProviderComponentPath,
    contextProviderComponentData
  );
}

module.exports = createComponents;
