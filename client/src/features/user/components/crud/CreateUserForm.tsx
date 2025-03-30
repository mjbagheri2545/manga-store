import { CreateEntityForm } from "@/components/ui/form";
import { useProgress } from "@/contexts/ProgressContext";
import { createOnUploadProgress } from "@/utils";

import userCrudApi from "../../api/crud.api";
import { createUserSchema } from "../../schemas/crud.schema";
import UserFormFields from "./UserFormFields";

function CreateUserForm() {
  const { setProgress } = useProgress();

  return (
    <CreateEntityForm
      createMethod={({ data }) =>
        userCrudApi.create({
          data,
          onUploadProgress: createOnUploadProgress(setProgress),
        })
      }
      entityKey="user"
      schema={createUserSchema}
      getIdFromData={(data) => data.id}
      useFormProps={{
        // other Inputs have default value automatically
        defaultValues: {
          role: "user",
        },
      }}
      submitButton="افزودن کاربر"
    >
      <UserFormFields />
    </CreateEntityForm>
  );
}

export default CreateUserForm;
