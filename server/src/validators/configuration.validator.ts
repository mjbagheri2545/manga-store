import { NextFunction, Request, Response } from "express";
import {
  body,
  checkExact,
  Location,
  param,
  query,
  ValidationChain,
  validationResult,
} from "express-validator";

import autoBind from "auto-bind";

import CONFIG from "@/constants/config";
import MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { MiddlewareParams, TypeOrTypeArray } from "@/types";
import { parseTypeOrTypeArray } from "@/utils";

type CustomLocation = Exclude<Location, "cookies" | "headers">;

type RequiredOptions = {
  location?: CustomLocation;
} & ({ label: string } | { message: string });

type MinLengthOptions = RequiredOptions & {
  minLength?: number;
};

abstract class ValidatorConfiguration {
  protected readonly MESSAGES;
  protected readonly CONFIG;
  protected readonly body;
  protected readonly query;
  protected readonly params;

  constructor() {
    autoBind(this);
    this.MESSAGES = MESSAGES.validation;
    this.CONFIG = CONFIG.validation;

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
        : this.MESSAGES.required(restOptions.label);

    return this.string(field, location)
      .notEmpty({ ignore_whitespace: true })
      .withMessage(finalMessage);
  }

  protected minLength(
    field: string,
    { location = "body", minLength, ...restOptions }: MinLengthOptions
  ) {
    const finalMinLength = minLength ?? this.CONFIG.stringMinLength;
    const finalMessage =
      "message" in restOptions
        ? restOptions.message
        : this.MESSAGES.minLength(restOptions.label, finalMinLength);

    return this.string(field, location)
      .isLength({ min: minLength })
      .withMessage(finalMessage);
  }

  protected createValidation(schema: TypeOrTypeArray<ValidationChain>) {
    return async (...params: MiddlewareParams) => {
      const [req, res] = params;

      const checkExactResult = await checkExact(schema, {
        message: (fields) =>
          this.MESSAGES.unknownFields(
            fields.map((field) => field.path).join(", ")
          ),
      }).run(req);

      if (!checkExactResult.isEmpty()) {
        return res
          .status(STATUS_CODES.unprocessableEntity)
          .json({ message: checkExactResult.context.errors[0].msg });
      }
      return [
        ...parseTypeOrTypeArray(this.createSafeValidations(schema)),
        this.validate(...params),
      ];
    };
  }
  private createSafeValidations(validations: TypeOrTypeArray<ValidationChain>) {
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

      return res.status(STATUS_CODES.badRequest).json({ message: messages });
    }
    next();
  }
}

export default ValidatorConfiguration;
