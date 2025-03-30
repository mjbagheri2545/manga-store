const fs = require("fs/promises");

async function createTablePage(
  adminPagesDirPath,
  name,
  capitalizedName,
  entityName
) {
  const tablePagePath = `${adminPagesDirPath}/${capitalizedName}sPage.tsx`;
  const tablePageData = `
    import { PageHeader, Section } from "@/components/ui/layout";
    import { Button } from "@/components/utility";
    import PATH from "@/constants/path";
    import ${capitalizedName}sTable from "@/features/${name}/components/crud/${capitalizedName}sTable";

    function ${capitalizedName}sPage() {
      return (
        <>
          <PageHeader title="${entityName} ها">
            <Button isLinkComponent to={PATH.admin.create("${name}")} isWide>
              افزودن ${entityName}
            </Button>
          </PageHeader>
          <Section>
            <${capitalizedName}sTable />
          </Section>
        </>
      );
    }

    export default ${capitalizedName}sPage;

  `;

  await fs.writeFile(tablePagePath, tablePageData);
}

module.exports = createTablePage;
