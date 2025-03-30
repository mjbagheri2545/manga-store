const fs = require("fs/promises");

async function createCreatePage(
  adminPagesDirPath,
  name,
  capitalizedName,
  entityName
) {
  const createPagePath = `${adminPagesDirPath}/Create${capitalizedName}Page.tsx`;
  const createPageData = `
    import { Section } from "@/components/ui/layout";
    import Create${capitalizedName}Form from "@/features/${name}/components/crud/Create${capitalizedName}Form";

    import ${capitalizedName}PageHeader from "./${capitalizedName}PageHeader";

    function Create${capitalizedName}Page() {
      return (
        <>
          <${capitalizedName}PageHeader title="افزودن ${entityName} جدید" />
          <Section>
            <Create${capitalizedName}Form />
          </Section>
        </>
      );
    }

    export default Create${capitalizedName}Page;
  `;

  await fs.writeFile(createPagePath, createPageData);
}

module.exports = createCreatePage;
