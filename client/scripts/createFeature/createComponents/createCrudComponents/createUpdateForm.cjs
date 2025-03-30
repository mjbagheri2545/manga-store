const fs = require("fs/promises");

async function createUpdateForm(
  crudComponentsDirPath,
  name,
  capitalizedName,
  entityName
) {
  const updateFormComponentPath = `${crudComponentsDirPath}/Update${capitalizedName}Form.tsx`;
  const updateFormComponentData = `
    import { UpdateEntityForm } from "@/components/ui/form";
    import { ${capitalizedName} } from "@/types";

    import ${name}Api from "../../api";
    import { update${capitalizedName}Schema } from "../../schemas/crud.schema";
    import ${capitalizedName}FormFields from "./${capitalizedName}FormFields";

    type Update${capitalizedName}FormProps = {
      ${name}: ${capitalizedName};
    };

    function Update${capitalizedName}Form({ ${name} }: Update${capitalizedName}FormProps) {

        const ${name}DefaultData = pick(${name}, []);

      return (
        <UpdateEntityForm
          updateMethod={${name}Api.update}
          entityKey="${name}"
          schema={update${capitalizedName}Schema}
          submitButton="به‌روزرسانی ${entityName} "
          useFormProps={{
            defaultValues: {
              ...${name}DefaultData,
            },
          }}
        >
          <${capitalizedName}FormFields ${name}={${name}} />
        </UpdateEntityForm>
      );
    }

    export default Update${capitalizedName}Form;
  `;

  await fs.writeFile(updateFormComponentPath, updateFormComponentData);
}

module.exports = createUpdateForm;
