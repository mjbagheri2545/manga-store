import { TypeOrTypeArray } from "@/types";

export function upperFirst(str: string) {
  return str.slice(1) + str[0].toUpperCase();
}

export function lowerFirst(str: string) {
  return str.slice(1) + str[0].toLowerCase();
}

export function parseTypeOrTypeArray<T>(data: TypeOrTypeArray<T>): T[] {
  return Array.isArray(data) ? data : [data];
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
