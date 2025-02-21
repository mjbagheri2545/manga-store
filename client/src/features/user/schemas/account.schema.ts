import { z } from "zod";

import AUTH_USER_MESSAGES from "@/constants/messages/features/auth_user.message";
import {
  currentPasswordValidator,
  emailValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators/auth_user.validator";

import { verificationCodeValidator } from "../validators/account.validator";

const changePasswordBaseSchema = z.object({
  newPassword: newPasswordValidator("رمز عبور جدید"),
  newPasswordConfirmation: newPasswordConfirmationValidator(
    "تایید رمز عبور جدید"
  ),
});

const passwordConfirmationValidationOptions = {
  message: AUTH_USER_MESSAGES.validation.password.confirmation("رمز عبور جدید"),
  path: ["newPasswordConfirmation"],
};

function checkPasswordConfirmation<
  T extends z.infer<typeof changePasswordBaseSchema>,
>(data: T) {
  return data.newPassword === data.newPasswordConfirmation;
}

export const getEmailSchema = z.object({
  email: emailValidator(),
});

export type GetEmailData = z.infer<typeof getEmailSchema>;

export const passwordRecoveryRecoverSchema = z
  .object({
    verificationCode: verificationCodeValidator(),
  })
  .extend(changePasswordBaseSchema.shape)
  .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

export type PasswordRecoveryRecoverData = z.infer<
  typeof passwordRecoveryRecoverSchema
>;

export const passwordResetSchema = z
  .object({
    currentPassword: currentPasswordValidator("رمز عبور فعلی"),
  })
  .extend(changePasswordBaseSchema.shape)
  .refine(checkPasswordConfirmation, passwordConfirmationValidationOptions);

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

export const verificationSchema = z.object({
  verificationCode: verificationCodeValidator(),
});

export type VerificationData = z.infer<typeof verificationSchema>;
