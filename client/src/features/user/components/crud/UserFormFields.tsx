import {
  FileInput,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/form";
import { FormFieldsContainer } from "@/components/ui/form";
import RenderItems from "@/components/ui/RenderItems";
import { User, USER_ROLES } from "@/types";

import { MAX_BIO_LENGTH } from "../../schemas/crud.schema";

type UserFormFieldsProps = {
  user?: User;
};

function UserFormFields({ user }: UserFormFieldsProps) {
  return (
    <>
      <FormFieldsContainer>
        <InputField controllerName="fullName" label="نام و نام خانوادگی" />
        <InputField
          controllerName="email"
          label="ایمیل"
          fieldProps={{ type: "email" }}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <InputField
          controllerName="password"
          label="رمز عبور"
          fieldProps={{ type: "password" }}
          isRequired={user == null}
        />
        <InputField
          controllerName="passwordConfirmation"
          label="تایید رمز عبور"
          fieldProps={{ type: "password" }}
          isRequired={user == null}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <InputField
          controllerName="walletBalanceInToman"
          label="موجودی کیف پول"
          fieldProps={{ placeholder: "مجودی کیف پول به تومان" }}
          isRequired={false}
        />
        <SelectField
          controllerName="role"
          label="نقش کاربری"
          containerProps={{ className: "w-full md:w-auto md:flex-1" }}
        >
          <RenderItems
            items={USER_ROLES}
            renderItem={(userRole) => (
              <option value={userRole}>{userRole}</option>
            )}
          />
        </SelectField>
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FileInput
          controllerName="avatarImage"
          label="تصویر پروفایل"
          isRequired={false}
          fieldProps={{
            filePath: user?.avatarImage,
            imageProps: { alt: user?.fullName },
          }}
          containerProps={{
            className: "flex-1",
          }}
        />
      </FormFieldsContainer>
      <TextareaField
        controllerName="bio"
        label="بیوگرافی"
        fieldProps={{ placeholder: `حداکثر ${MAX_BIO_LENGTH} حرف` }}
        isRequired={false}
      />
    </>
  );
}

export default UserFormFields;
