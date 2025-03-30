const fs = require("fs/promises");

async function createComponents(
  componentsDirPath,
  name,
  capitalizedName,
  entityName
) {
  const contextProviderComponentPath = `${componentsDirPath}/${capitalizedName}Provider.tsx`;
  const contextProviderComponentData = `
  import { PropsWithChildren } from "react";
  import { ApiIdComponent } from "@/components/ui/api";
  
  import ${name}Api from "../api";
  import { ${capitalizedName}Context } from "../contexts";

  function ${capitalizedName}Provider({ children }: PropsWithChildren) {

    return <ApiIdComponent getByIdMethod={${name}Api.getById} entityName="${entityName}">
          {(data) => <${capitalizedName}Context.Provider value={data}>{children}</${capitalizedName}Context.Provider>}
    </ApiIdComponent>
  }
  
  export default ${capitalizedName}Provider;
  `;

  await fs.writeFile(
    contextProviderComponentPath,
    contextProviderComponentData
  );
}

module.exports = createComponents;
