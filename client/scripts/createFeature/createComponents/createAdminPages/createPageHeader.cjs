const fs = require("fs/promises");

async function createPageHeader(
  adminPagesDirPath,
  name,
  capitalizedName,
  entityName
) {
  const pageHeaderPath = `${adminPagesDirPath}/${capitalizedName}PageHeader.tsx`;
  const pageHeaderData = `
    import { PageHeader, PageHeaderProps } from "@/components/ui/layout";
    import { Link } from "@/components/utility";
    import PATH from "@/constants/path";
    
    function ${capitalizedName}PageHeader({ title }: PageHeaderProps) {
      return (
        <PageHeader title={title}>
          <Link to={PATH.admin.index("${name}")}>${entityName} ها</Link>
        </PageHeader>
      );
    }

    export default ${capitalizedName}PageHeader;
  `;

  await fs.writeFile(pageHeaderPath, pageHeaderData);
}

module.exports = createPageHeader;
