const fs = require("fs/promises");

async function createCreateForm(crudComponentsDirPath, name, capitalizedName,entityName) {
  const createFormComponentPath = `${crudComponentsDirPath}/Create${capitalizedName}Form.tsx`;
  const createFormComponentData = `
  import { CreateEntityForm } from "@/components/ui/form";

  import ${name}Api from "../../api";
  import { create${capitalizedName}Schema } from "../../schemas";
  import ${capitalizedName}FormFields from "./${capitalizedName}FormFields";

  function Create${capitalizedName}Form() {
    return (
      <CreateEntityForm
        createMethod={${name}Api.create}
        entityKey="${name}"
        schema={create${capitalizedName}Schema}
        getIdFromData={(data) => data.id}
        useFormProps={{
          // other Inputs have default value automatically
          defaultValues: {
          },
        }}
        submitButton="افزودن ${entityName}"
      >
        <${capitalizedName}FormFields />
      </CreateEntityForm>
    );
  }

  export default Create${capitalizedName}Form;
  `;

  await fs.writeFile(
    createFormComponentPath,
    createFormComponentData
  );
}

module.exports = createCreateForm;
