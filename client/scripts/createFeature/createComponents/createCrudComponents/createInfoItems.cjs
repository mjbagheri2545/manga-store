const fs = require("fs/promises");

async function createInfoItems(
  crudComponentsDirPath,
  capitalizedName,
  upperCasedName,
  entityName
) {
  const infoItemsComponentPath = `${crudComponentsDirPath}/${capitalizedName}InfoItems.tsx`;
  const infoItemsComponentData = `
    import {
      IdCardIcon,
      CalendarPlusIcon,
    } from "lucide-react";

    import { TEntityInfo } from "@/components/ui/crud";
    import TextWithIcon from "@/components/ui/TextWithIcon";
    import { ${capitalizedName} } from "@/types";

    const ${upperCasedName}_INFO_ITEMS = {
      id: {
        keyName: "آیدی ${entityName}",
        Icon: IdCardIcon,
      },
      createdAt: {
        renderItem: (createdAt: string) => (
          <TextWithIcon Icon={CalendarPlusIcon}>
            زمان ایجاد: {new Date(createdAt).toLocaleString("fa")}
          </TextWithIcon>
        ),
      },
    } as TEntityInfo<${capitalizedName}>;

    export default ${upperCasedName}_INFO_ITEMS;

  `;

  await fs.writeFile(infoItemsComponentPath, infoItemsComponentData);
}

module.exports = createInfoItems;
