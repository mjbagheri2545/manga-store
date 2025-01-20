import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";
import {
  currentPasswordValidator,
  emailValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators";
import { minLength } from "@/validators/configuration.validator";

function createAuthSchema() {
  const registrationSchema = z
    .object({
      fullName: minLength({ label: "نام و نام خانوادگی" }),
      email: emailValidator(),
      password: newPasswordValidator(),
      passwordConfirmation: newPasswordConfirmationValidator(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message:
        SHARED_MESSAGES.validation.general.auth_user.password.confirmation(
          "رمز عبور"
        ),
      path: ["passwordConfirmation"],
    });

  const loginSchema = z.object({
    email: emailValidator(),
    password: currentPasswordValidator(),
  });

  return {
    registration: registrationSchema,
    login: loginSchema,
  };
}

const AUTH_SCHEMA = createAuthSchema();

export default AUTH_SCHEMA;
