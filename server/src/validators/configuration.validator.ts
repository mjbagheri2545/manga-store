import { NextFunction, Request, Response } from "express";
import {
  CustomValidationChain as ExpressValidatorCustomValidationChain,
  ExpressValidator,
  Location,
} from "express-validator";

import autoBind from "auto-bind";

import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { MiddlewareParams, TypeOrTypeArray } from "@/types";
import { failedResponse, parseTypeOrTypeArray } from "@/utils";

type CustomLocation = Exclude<Location, "cookies" | "headers">;

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

const { body, checkExact, param, query, validationResult } =
  customExpressValidator;

export type CustomValidationChain = ExpressValidatorCustomValidationChain<
  typeof customExpressValidator
>;

abstract class ValidatorConfiguration {
  protected readonly SHARED_MESSAGES;
  protected readonly SHARED_CONFIG;
  protected readonly body;
  protected readonly query;
  protected readonly params;

  constructor() {
    autoBind(this);
    this.SHARED_MESSAGES = SHARED_MESSAGES.validation;
    this.SHARED_CONFIG = SHARED_CONFIG.validation;

    this.body = body;
    this.query = query;
    this.params = param;
  }

  protected string(field: string, location: CustomLocation = "body") {
    return this[location](field).isString().trim();
  }

  protected required(
    field: string,
    { location = "body", ...restOptions }: RequiredOptions
  ) {
    const finalMessage =
      "message" in restOptions
        ? restOptions.message
        : this.SHARED_MESSAGES.required(restOptions.label);

    return this.string(field, location)
      .notEmpty({ ignore_whitespace: true })
      .withMessage(finalMessage);
  }

  protected isLength(
    field: string,
    { location = "body", min, max, ...restOptions }: IsLengthOptions
  ) {
    const finalMinLength = min ?? this.SHARED_CONFIG.stringMinLength;
    const finalMessage =
      "message" in restOptions
        ? restOptions.message
        : this.SHARED_MESSAGES.minLength(restOptions.label, finalMinLength);

    return this.string(field, location)
      .isLength({ min: finalMinLength, max })
      .withMessage(finalMessage);
  }

  protected slug(field = "id", label = "آیدی مورد نظر") {
    return this.required(field, {
      location: "params",
      label,
    });
  }

  slugValidation(field = "id", label = "با آیدی مورد نظر") {
    return this.createValidation([this.slug(field, label)]);
  }

  protected createValidation(schema: TypeOrTypeArray<CustomValidationChain>) {
    return async (...params: MiddlewareParams) => {
      const [req, res] = params;

      const checkExactResult = await checkExact(schema, {
        message: (fields) =>
          this.SHARED_MESSAGES.unknownFields(
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
      return [
        ...parseTypeOrTypeArray(this.createSafeValidations(schema)),
        this.validate(...params),
      ];
    };
  }

  private createSafeValidations(
    validations: TypeOrTypeArray<CustomValidationChain>
  ) {
    return parseTypeOrTypeArray(validations).map((validation) =>
      validation.escape()
    );
  }

  private async validate(req: Request, res: Response, next: NextFunction) {
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
}

export default ValidatorConfiguration;
