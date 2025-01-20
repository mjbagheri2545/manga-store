import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";

import { minLength, required, string } from "./configuration.validator";

export function emailValidator() {
  return required({ label: "ایمیل" }).email(
    SHARED_MESSAGES.validation.general.auth_user.email
  );
}

export function newPasswordValidator(label = "رمز عبور") {
  return string(label).regex(SHARED_CONFIG.validation.password.pattern, {
    message: SHARED_MESSAGES.validation.general.auth_user.password.new(label),
  });
}

export function newPasswordConfirmationValidator(label = "رمز عبور") {
  return required({ label: `تایید ${label}` });
}

export function currentPasswordValidator(label = "رمز عبور") {
  return minLength({
    label,
    minLength: SHARED_CONFIG.validation.password.minLength,
  });
}
