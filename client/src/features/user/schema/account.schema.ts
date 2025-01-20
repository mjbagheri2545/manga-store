import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";
import {
  currentPasswordValidator,
  emailValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators";

import { verificationCodeValidator } from "../validators/account.validator";

function createUserAccountSchema() {
  const changePasswordBaseSchema = z.object({
    newPassword: newPasswordValidator("رمز عبور جدید"),
    newPasswordConfirmation: newPasswordConfirmationValidator(
      "تایید رمز عبور جدید"
    ),
  });

  const passwordConfirmationValidationOptions = {
    message:
      SHARED_MESSAGES.validation.general.auth_user.password.confirmation(
        "رمز عبور جدید"
      ),
    path: ["newPasswordConfirmation"],
  };

  function checkPasswordConfirmation<
    T extends z.infer<typeof changePasswordBaseSchema>,
  >(data: T) {
    return data.newPassword === data.newPasswordConfirmation;
  }

  const passwordRecoveryGetEmailSchema = z.object({
    email: emailValidator(),
  });

  const passwordRecoveryRecoverSchema = z
    .object({
      verificationCode: verificationCodeValidator(),
    })
    .extend(changePasswordBaseSchema.shape)
    .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

  const passwordResetSchema = z
    .object({
      currentPassword: currentPasswordValidator("رمز عبور فعلی"),
    })
    .extend(changePasswordBaseSchema.shape)
    .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

  const verificationVerifySchema = z.object({
    verificationCode: verificationCodeValidator(),
  });

  return {
    verification: { verify: verificationVerifySchema },
    password: {
      recovery: {
        getEmail: passwordRecoveryGetEmailSchema,
        recover: passwordRecoveryRecoverSchema,
      },
      reset: passwordResetSchema,
    },
  };
}

const USER_ACCOUNT_SCHEMA = createUserAccountSchema();

export default USER_ACCOUNT_SCHEMA;
