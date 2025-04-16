const fs = require("fs/promises");

async function createCrudTable(crudComponentsDirPath, name, capitalizedName) {
  const crudTableComponentPath = `${crudComponentsDirPath}/${capitalizedName}sTable.tsx`;
  const crudTableComponentData = `
    import { CrudTable } from "@/components/ui/crud";
    import { TableColumn } from "@/components/utility/table";   

    import ${name}Api, { GetAll${capitalizedName}Base } from "../../api";

    const ${name}TableColumns = [
     { key: "", title: "" },
     { key: "", title: "" },
     { key: "", title: "" },
     { key: "", title: "" },
     { key: "", title: "" },
     {
       key: "createdAt",
       title: "تاریخ ایجاد",
       render: (createdAt: string) => new Date(createdAt).toLocaleDateString("fa"),
     },
    ] as TableColumn<GetAll${capitalizedName}Base>[];

    function ${capitalizedName}sTable() {
      return (
        <CrudTable
          api={${name}Api}
          entityKey="${name}"
          getEntitiesFromData={(data) => data.${name}s}
          columns={${name}TableColumns}
        />
      );
    }
  
  export default ${capitalizedName}sTable;
  `;

  await fs.writeFile(
    crudTableComponentPath,
    crudTableComponentData
  );
}

module.exports = createCrudTable;
