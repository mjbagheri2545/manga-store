const fs = require("fs/promises");

async function createFormFields(crudComponentsDirPath, name, capitalizedName) {
  const formFieldsComponentPath = `${crudComponentsDirPath}/${capitalizedName}FormFields.tsx`;
  const formFieldsComponentData = `
    import {
      FileInput,
      InputField,
      SelectField,
      TextareaField,
    } from "@/components/form";
    import { FormFieldsContainer } from "@/components/ui/form";
    import RenderItems from "@/components/utility/RenderItems";

    type ${capitalizedName}FormFieldsProps = {
      ${name}?: ${capitalizedName};
    };  

    function ${capitalizedName}FormFields({ ${name} }: ${capitalizedName}FormFieldsProps) {
      return (
        <>
          <FormFieldsContainer>
            <InputField controllerName="" label="" />
            <SelectField
              controllerName=""
              label=""
              containerProps={{ className: "w-full md:w-auto md:flex-1" }}
            >
              <RenderItems
                items={}
                renderItem={() => (
                  <option value={}>{}</option>
                )}
              />
            </SelectField>
          </FormFieldsContainer>
          <TextareaField
            controllerName=""
            label=""
          />
        </>
      );
    }   

    export default ${capitalizedName}FormFields;
  `;

  await fs.writeFile(formFieldsComponentPath, formFieldsComponentData);
}

module.exports = createFormFields;
