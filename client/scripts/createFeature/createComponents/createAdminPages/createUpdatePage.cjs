const fs = require("fs/promises");

async function createUpdatePage(
  adminPagesDirPath,
  name,
  capitalizedName,
  entityName
) {
  const updatePagePath = `${adminPagesDirPath}/Update${capitalizedName}Page.tsx`;
  const updatePageData = `
    import { ApiIdComponent } from "@/components/ui/api";
    import { Section } from "@/components/ui/layout";
    import ${name}Api from "@/features/${name}/api";
    import Update${capitalizedName}Form from "@/features/${name}/components/crud/Update${capitalizedName}Form";

    import ${capitalizedName}PageHeader from "./${capitalizedName}PageHeader";

    function Update${capitalizedName}Page() {
      return (
        <>
          <${capitalizedName}PageHeader title="به‌روزرسانی ${entityName}" />
          <Section>
            <ApiIdComponent
              getByIdMethod={${name}Api.getById}
              entityName="${entityName}"
            >
              {(data) => <Update${capitalizedName}Form {...data} />}
            </ApiIdComponent>
          </Section>
        </>
      );
    }

    export default Update${capitalizedName}Page;
  `;

  await fs.writeFile(updatePagePath, updatePageData);
}

module.exports = createUpdatePage;
