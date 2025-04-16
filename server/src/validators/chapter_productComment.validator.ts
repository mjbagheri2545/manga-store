import { createValidation, slugValidator } from ".";

export function idValidators(label: string) {
  return [productIdValidator(), slugValidator("id", `آیدی ${label}`)];
}

export function idValidations(label: string) {
  return createValidation(idValidators(label));
}

export function productIdValidator() {
  return slugValidator("productId", "آیدی محصول");
}

export function productIdValidation() {
  return createValidation([productIdValidator()]);
}
