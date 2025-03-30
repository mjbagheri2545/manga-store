import { z } from "zod";

import { PASSWORD_REGEX } from "@/constants/global/features/auth_user.global";
import SHARED_MESSAGES from "@/constants/messages";
import AUTH_USER_MESSAGES from "@/constants/messages/features/auth_user.message";
import { baseRegistrationSchema } from "@/schemas/auth.schema";
import { number, string } from "@/validators";
import { imageValidator } from "@/validators/user_product.validator";

const userRolesSchema = z.union([
  z.literal("user"),
  z.literal("translator"),
  z.literal("manager"),
  z.literal("admin"),
]);

export const MAX_BIO_LENGTH = 600;

const baseUserSchema = z
  .object({
    walletBalanceInToman: number(),
    bio: string().refine(
      (bio) =>
        bio.length === 0 || (bio.length > 2 && bio.length < MAX_BIO_LENGTH),
      {
        message: SHARED_MESSAGES.validation.optional(
          "بیوگرافی",
          SHARED_MESSAGES.validation.minMax({
            label: "بیوگرافی",
            max: MAX_BIO_LENGTH,
            min: 2,
            typeLabel: "طول",
          })
        ),
      }
    ),

    role: userRolesSchema,
    avatarImage: imageValidator("تصویر پروفایل").optional(),
  })
  .extend(baseRegistrationSchema.shape);

export const createUserSchema = baseUserSchema.refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: AUTH_USER_MESSAGES.password.confirmation("رمز عبور"),
    path: ["passwordConfirmation"],
  }
);

export type CreateUserData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z
  .object({
    password: string("رمز عبور").refine(
      (password) => password.length === 0 || password.match(PASSWORD_REGEX),
      AUTH_USER_MESSAGES.password.new("رمز عبور")
    ),
    passwordConfirmation: string("تایید رمز عبور"),
  })
  .extend(
    baseUserSchema.omit({ password: true, passwordConfirmation: true }).shape
  )
  .partial({ avatarImage: true })
  .refine(
    (data) =>
      data.password == null || data.password === data.passwordConfirmation,
    {
      message: AUTH_USER_MESSAGES.password.confirmation("رمز عبور"),
      path: ["passwordConfirmation"],
    }
  );
