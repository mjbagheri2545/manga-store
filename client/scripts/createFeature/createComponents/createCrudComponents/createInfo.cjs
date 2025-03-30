const fs = require("fs/promises");

async function createInfo(crudComponentsDirPath, name, capitalizedName,upperCasedName) {
  const infoComponentPath = `${crudComponentsDirPath}/${capitalizedName}Info.tsx`;
  const infoComponentData = `
    import { EntityInfo } from "@/components/ui/crud";

    import ${name}Api from "../../api";
    import ${upperCasedName}_INFO_ITEMS from "./${capitalizedName}InfoItems";

    function ${capitalizedName}Info() {
      return (
        <EntityInfo
          entityKey="${name}"
          getByIdMethod={${name}Api.getById}
          getEntityFromData={(data) => data.${name}}
          info={${upperCasedName}_INFO_ITEMS}
        />
      );
    }

    export default ${capitalizedName}Info;
  `;

  await fs.writeFile(
    infoComponentPath,
    infoComponentData
  );
}

module.exports = createInfo;
