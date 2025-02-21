import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "@/constants/global/features/auth_user.global";
import AUTH_USER_MESSAGES from "@/constants/messages/features/auth_user.message";

import { minLength, required, string } from ".";

export function emailValidator() {
  return required({ label: "ایمیل" }).email(
    AUTH_USER_MESSAGES.validation.email
  );
}

export function newPasswordValidator(label = "رمز عبور") {
  return string(label).regex(PASSWORD_REGEX, {
    message: AUTH_USER_MESSAGES.validation.password.new(label),
  });
}

export function newPasswordConfirmationValidator(label = "رمز عبور") {
  return required({ label: `تایید ${label}` });
}

export function currentPasswordValidator(label = "رمز عبور") {
  return minLength({
    label,
    minLength: PASSWORD_MIN_LENGTH,
  });
}
