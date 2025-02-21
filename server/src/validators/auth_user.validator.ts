import { PASSWORD_CONFIG } from "@/constants/global/featuers/auth_user.global";
import AUTH_USER_MESSAGES from "@/constants/messages/features/auth_user.message";
import sharedUserService from "@/services/user.service";

import { isLength, string, uniquenessValidator } from ".";

export function emailValidator() {
  return string("email")
    .isEmail()
    .withMessage(AUTH_USER_MESSAGES.validation.email.invalid);
}

export function currentPasswordValidator(
  field = "password",
  label = "رمز عبور"
) {
  return isLength(field, {
    min: PASSWORD_CONFIG.minLength,
    label,
  });
}

export function newPasswordValidator(field = "password", label = "رمز عبور") {
  return string(field)
    .matches(PASSWORD_CONFIG.regex)
    .withMessage(AUTH_USER_MESSAGES.validation.password.new(label));
}

export function newPasswordConfirmationValidator(
  field = "password",
  label = "تایید رمز عبور"
) {
  return string(`${field}Confirmation`)
    .custom((value, { req }) => value === req.body[field])
    .withMessage(AUTH_USER_MESSAGES.validation.password.confirmation(label));
}

export function fullNameValidator() {
  return isLength("fullName", { label: "نام و نام خانوادگی" });
}

export function emailNotInUseValidator() {
  return emailValidator()
    .custom(uniquenessValidator(sharedUserService.getByEmail))
    .withMessage(AUTH_USER_MESSAGES.validation.email.inUse);
}
