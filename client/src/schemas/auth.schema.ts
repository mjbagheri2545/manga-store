import { z } from "zod";

import AUTH_USER_MESSAGES from "@/constants/messages/features/auth_user.message";
import { minLength } from "@/validators";
import {
  currentPasswordValidator,
  emailValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators/auth_user.validator";

export const registrationSchema = z
  .object({
    fullName: minLength({ label: "نام و نام خانوادگی" }),
    email: emailValidator(),
    password: newPasswordValidator(),
    passwordConfirmation: newPasswordConfirmationValidator(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: AUTH_USER_MESSAGES.password.confirmation("رمز عبور"),
    path: ["passwordConfirmation"],
  });

export type RegistrationData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: emailValidator(),
  password: currentPasswordValidator(),
});

export type LoginData = z.infer<typeof loginSchema>;
