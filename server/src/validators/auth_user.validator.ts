import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";
import { sharedUserService } from "@/services";

import { isLength, string } from "./configuration.validator";

export function emailValidator() {
  return string("email")
    .isEmail()
    .withMessage(SHARED_MESSAGES.validation.features.auth_user.email);
}

export function currentPasswordValidator(
  field = "password",
  label = "رمز عبور"
) {
  const { minLength } = SHARED_CONFIG.validation.password;

  return isLength(field, {
    min: minLength,
    label,
  });
}

export function newPasswordValidator(field = "password", label = "رمز عبور") {
  return string(field)
    .matches(SHARED_CONFIG.validation.password.pattern)
    .withMessage(
      SHARED_MESSAGES.validation.features.auth_user.password.new(label)
    );
}

export function newPasswordConfirmationValidator(
  field = "password",
  label = "تایید رمز عبور"
) {
  return string(`${field}Confirmation`)
    .custom((value, { req }) => value === req.body[field])
    .withMessage(
      SHARED_MESSAGES.validation.features.auth_user.password.confirmation(label)
    );
}

export function fullNameValidator() {
  return isLength("fullName", { label: "نام و نام خانوادگی" });
}

export function emailNotInUseValidator() {
  return emailValidator()
    .custom(async (value: string) => {
      const user = await sharedUserService.getByEmail(value);
      if (user != null) {
        throw new Error();
      }
      return;
    })
    .withMessage(SHARED_MESSAGES.validation.features.auth_user.emailInUse);
}
