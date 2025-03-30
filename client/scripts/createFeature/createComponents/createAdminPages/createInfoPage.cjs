const fs = require("fs/promises");

async function createInfoPage(
  adminPagesDirPath,
  name,
  capitalizedName,
  entityName
) {
  const infoPagePath = `${adminPagesDirPath}/${capitalizedName}InfoPage.tsx`;
  const infoPageData = `
    import { Section } from "@/components/ui/layout";
    import ${capitalizedName}Info from "@/features/${name}/components/crud/${capitalizedName}Info";

    import ${capitalizedName}PageHeader from "./${capitalizedName}PageHeader";

    function ${capitalizedName}InfoPage() {
      return (
        <>
          <${capitalizedName}PageHeader title="اطلاعات ${entityName}" />
          <Section>
            <${capitalizedName}Info />
          </Section>
        </>
      );
    }

    export default ${capitalizedName}InfoPage;
  `;

  await fs.writeFile(infoPagePath, infoPageData);
}

module.exports = createInfoPage;
