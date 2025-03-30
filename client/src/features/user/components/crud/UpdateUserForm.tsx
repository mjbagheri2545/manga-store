import { UpdateEntityForm } from "@/components/ui/form";
import { useProgress } from "@/contexts/ProgressContext";
import { User } from "@/types";
import { createOnUploadProgress, pick } from "@/utils";

import userCrudApi from "../../api/crud.api";
import { updateUserSchema } from "../../schemas/crud.schema";
import UserFormFields from "./UserFormFields";

type UpdateUserFormProps = {
  user: User;
};

function UpdateUserForm({ user }: UpdateUserFormProps) {
  const { setProgress } = useProgress();

  const userDefaultData = pick(user, [
    "createdAt",
    "fullName",
    "email",
    "walletBalanceInToman",
  ]);

  return (
    <UpdateEntityForm
      updateMethod={(options) =>
        userCrudApi.update({
          ...options,
          onUploadProgress: createOnUploadProgress(setProgress),
        })
      }
      entityKey="user"
      schema={updateUserSchema}
      submitButton="به‌روزرسانی کاربر"
      useFormProps={{
        defaultValues: {
          ...userDefaultData,
          bio: user.bio ?? "",
          role: user.roles[user.roles.length - 1],
        },
      }}
    >
      <UserFormFields user={user} />
    </UpdateEntityForm>
  );
}

export default UpdateUserForm;
