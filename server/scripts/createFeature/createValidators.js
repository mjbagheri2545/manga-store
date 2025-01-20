const fs = require("fs/promises");

async function createValidators(featureDirPath, capitalizedName) {
  const validatorsDirPath = `${featureDirPath}/validators`;
  await fs.mkdir(validatorsDirPath);

  const validatorPath = `${validatorsDirPath}/index.ts`;
  const validatorData = `
        import { AutoBind } from "@/utils";

        import {
           createValidation,
           isLength,
           required,
           slugValidator,
         } from "@/validators";

        class ${capitalizedName}Validator extends AutoBind {
            private getCreate${capitalizedName}Validation() {
             return [

             ];
            } 

            create${capitalizedName}Validation() {
             return createValidation([
               ...this.getCreate${capitalizedName}Validation(),
             ]);
            } 

            update${capitalizedName}Validation() {
             const optionalFields = this.getCreate${capitalizedName}Validation().map(
               (validationChain) => validationChain.optional()
             );

             return createValidation([
               ...optionalFields,
               slugValidator(),
             ]);
            } 
        }

        export default ${capitalizedName}Validator;
    `;
  await fs.writeFile(validatorPath, validatorData);
}

module.exports = createValidators;
