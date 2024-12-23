import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";
import AuthUserValidator from "@/validators/auth_user.validator";

function createAuthSchema() {
  const validator = new AuthUserValidator();

  const registrationSchema = z
    .object({
      fullName: validator.minLength({ label: "نام و نام خانوادگی" }),
      email: validator.email(),
      password: validator.newPassword(),
      passwordConfirmation: validator.newPasswordConfirmation(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message:
        SHARED_MESSAGES.validation.common.auth_user.password.confirmation(
          "رمز عبور"
        ),
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

const SCHEMA = createAuthSchema();

export default SCHEMA;
