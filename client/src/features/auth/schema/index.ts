import { z } from "zod";

import MESSAGES from "@/constants/messages";
import AuthUserValidator from "@/validators/auth_user.validator";

function createAuthSchema() {
  const validator = new AuthUserValidator();

  const registrationSchema = z
    .object({
      fullName: validator.minLength({ label: "نام و نام خانوادگی" }),
      email: validator.email(),
      password: validator.newPassword(),
      newPasswordConfirmation: validator.newPasswordConfirmation(),
    })
    .refine((data) => data.password === data.newPasswordConfirmation, {
      message:
        MESSAGES.validation.auth_user.common.password.confirmation("رمز عبور"),
      path: ["passwordConfirmation"],
    });

  const loginSchema = z.object({
    email: validator.email(),
    password: validator.currentPassword(),
  });

  return {
    registration: registrationSchema,
    login: loginSchema,
  };
}

export default createAuthSchema();
