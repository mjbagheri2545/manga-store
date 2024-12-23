import Auth_UserForm, {
  Auth_UserFormProps,
} from "@/components/ui/auth_user/Auth_UserForm";
import Button from "@/components/utility/Button";
import { useExecuteAsync } from "@/hooks/useAsync";

import CONTENT from "../constants/content";
import FormNoticeText from "./FormNoticeText";

type IdentityVerificationFormProps = Auth_UserFormProps & {
  onResend: () => Promise<void>;
};

function IdentityVerificationForm({
  children,
  onResend,
  ...restProps
}: IdentityVerificationFormProps) {
  const { execute, isLoading } = useExecuteAsync(onResend);

  return (
    <Auth_UserForm {...restProps}>
      <FormNoticeText>
        {CONTENT.account.identityVerificationNoticeText}
      </FormNoticeText>
      <div>
        <span className="text-sm">کد را دریافت نکردید؟</span>
        <Button
          onClick={execute}
          isLoading={isLoading}
          type="button"
          className="btn-info btn-sm px-4 mr-2 text-white max-[480px]:px-3"
          spinnerProps={{ className: "size-6" }}
        >
          ارسال مجدد
        </Button>
      </div>
      {children}
    </Auth_UserForm>
  );
}

export default IdentityVerificationForm;
