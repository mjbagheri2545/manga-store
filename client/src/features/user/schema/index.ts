import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";

import Validator from "../validators";

function createUserSchema() {
  const validator = new Validator();

  const changePasswordBaseSchema = z.object({
    newPassword: validator.newPassword("رمز عبور جدید"),
    newPasswordConfirmation: validator.newPasswordConfirmation(
      "تایید رمز عبور جدید"
    ),
  });

  const passwordConfirmationValidationOptions = {
    message:
      SHARED_MESSAGES.validation.common.auth_user.password.confirmation(
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
    email: validator.email(),
  });

  const passwordRecoveryRecoverSchema = z
    .object({
      verificationCode: validator.verificationCode(),
    })
    .extend(changePasswordBaseSchema.shape)
    .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

  const passwordResetSchema = z
    .object({
      currentPassword: validator.currentPassword("رمز عبور فعلی"),
    })
    .extend(changePasswordBaseSchema.shape)
    .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

  const verificationVerifySchema = z.object({
    verificationCode: validator.verificationCode(),
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

const SCHEMA = createUserSchema();

export default SCHEMA;
