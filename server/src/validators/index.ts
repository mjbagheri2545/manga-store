import { NextFunction, Request, Response } from "express";
import {
  CustomValidationChain as ExpressValidatorCustomValidationChain,
  ExpressValidator,
  Location,
} from "express-validator";

import { Prisma } from "@prisma/client";

import { STRING_MIN_LENGTH } from "@/constants/global/general.global";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { MiddlewareParams } from "@/types";
import { failedResponse } from "@/utils";

type CustomLocation =
  | Exclude<Location, "cookies" | "headers" | "params">
  | "param";

type RequiredOptions = {
  location?: CustomLocation;
} & ({ label: string } | { message: string });

type IsLengthOptions = RequiredOptions & {
  min?: number;
  max?: number;
};

export const customExpressValidator = new ExpressValidator({
  ifExists(value: unknown) {
    return value != null;
  },
});

const { checkExact, validationResult } = customExpressValidator;

type CustomValidationChain = ExpressValidatorCustomValidationChain<
  typeof customExpressValidator
>;

export function string(field: string, location: CustomLocation = "body") {
  return customExpressValidator[location](field).isString().trim();
}

export function required(
  field: string,
  { location = "body", ...restOptions }: RequiredOptions
) {
  const finalMessage =
    "message" in restOptions
      ? restOptions.message
      : SHARED_MESSAGES.validation.required(restOptions.label);

  return string(field, location)
    .notEmpty({ ignore_whitespace: true })
    .withMessage(finalMessage);
}

export function isLength(
  field: string,
  { location = "body", min, max, ...restOptions }: IsLengthOptions
) {
  const finalMinLength = min ?? STRING_MIN_LENGTH;
  const finalMessage =
    "message" in restOptions
      ? restOptions.message
      : SHARED_MESSAGES.validation.minLength(restOptions.label, finalMinLength);

  return string(field, location)
    .isLength({ min: finalMinLength, max })
    .withMessage(finalMessage);
}

export function slugValidator(field = "id", label = "آیدی مورد نظر") {
  return required(field, {
    location: "param",
    label,
  });
}

export function uniquenessValidator<T>(
  service: (value: string) => Prisma.PrismaPromise<T | null>
) {
  return async (value: string) => {
    const entity = await service(value);
    if (entity != null) {
      throw new Error();
    }
    return;
  };
}

export function slugValidation(field = "id", label = "با آیدی مورد نظر") {
  return createValidation([slugValidator(field, label)]);
}

export function createValidation(validations: CustomValidationChain[]) {
  return async (...params: MiddlewareParams) => {
    const [req, res] = params;

    const checkExactResult = await checkExact(validations, {
      message: (fields) =>
        SHARED_MESSAGES.validation.unknownFields(
          fields.map((field) => field.path).join(", ")
        ),
    }).run(req);

    if (!checkExactResult.isEmpty()) {
      // log checkExactResult then you will see the error message
      // in the checkExactResult.context.errors[0].msg
      // not the checkExactResult.context.message

      const { msg } = checkExactResult.context.errors[0];

      return failedResponse({
        res,
        code: STATUS_CODES.unprocessableEntity,
        message: msg,
      });
    }
    return [...createSafeValidations(validations), validate(...params)];
  };
}

function createSafeValidations(validations: CustomValidationChain[]) {
  return validations.map((validation) => validation.escape());
}

function validate(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const messages = result.array({ onlyFirstError: true });

    const MAXIMUM_MESSAGES = 3;

    const finalMessages = messages
      .slice(0, MAXIMUM_MESSAGES)
      .map((error) => error.msg);

    const extraFieldsPath = messages
      .map((error) => {
        if (error.type === "field") return error.path;
      })
      .filter(Boolean)
      .slice(MAXIMUM_MESSAGES) as string[];

    if (messages.length > finalMessages.length) {
      finalMessages.push(
        SHARED_MESSAGES.validation.tooManyInvalidField(extraFieldsPath)
      );
    }

    return failedResponse({
      res,
      code: STATUS_CODES.badRequest,
      message: finalMessages,
    });
  }

  next();
}
