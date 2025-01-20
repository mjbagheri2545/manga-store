import { NextFunction, Request, Response } from "express";
import {
  CustomValidationChain as ExpressValidatorCustomValidationChain,
  ExpressValidator,
  Location,
} from "express-validator";

import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { MiddlewareParams, TypeOrTypeArray } from "@/types";
import { failedResponse, parseTypeOrTypeArray } from "@/utils";

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

const customExpressValidator = new ExpressValidator({
  ifExists(value: unknown) {
    return value != null;
  },
});

const { checkExact, validationResult } = customExpressValidator;

export type CustomValidationChain = ExpressValidatorCustomValidationChain<
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
  const finalMinLength = min ?? SHARED_CONFIG.validation.stringMinLength;
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

export function slugValidation(field = "id", label = "با آیدی مورد نظر") {
  return createValidation([slugValidator(field, label)]);
}

export function createValidation(validationChains: CustomValidationChain[]) {
  return async (...params: MiddlewareParams) => {
    const [req, res] = params;

    const checkExactResult = await checkExact(validationChains, {
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
    return [...createSafeValidations(validationChains), validate(...params)];
  };
}

function createSafeValidations(
  validations: TypeOrTypeArray<CustomValidationChain>
) {
  return parseTypeOrTypeArray(validations).map((validation) =>
    validation.escape()
  );
}

function validate(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const messages = result
      .array({ onlyFirstError: true })
      .map((error) => error.msg);

    return failedResponse({
      res,
      code: STATUS_CODES.badRequest,
      message: messages,
    });
  }

  next();
}
