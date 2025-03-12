import { FieldValues, FormState } from "react-hook-form";

import { AxiosProgressEvent } from "axios";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import tailwindTheme from "tailwindcss/defaultTheme";

import { ENTITY_NAMES } from "@/constants/global/general.global";
import SHARED_MESSAGES from "@/constants/messages";
import { EntityKey, State, TypeOrTypeArray } from "@/types";

export function parseTypeOrTypeArray<T>(data: TypeOrTypeArray<T>): T[] {
  return Array.isArray(data) ? data : [data];
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function withCatch<T>(
  promise: Promise<T>
): Promise<[Error & { message: string }] | [undefined, T]> {
  return promise
    .then((value) => {
      return [undefined, value] as [undefined, T];
    })
    .catch((error) => {
      const finalError = isError(error)
        ? error
        : new Error(SHARED_MESSAGES.general.unexpectedError());
      return [finalError];
    });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUpdatedFields<T extends FieldValues>(
  fieldValues: T,
  formState: FormState<T>
) {
  return Object.keys(fieldValues).reduce((accumulator, key) => {
    if (formState.dirtyFields[key as keyof FormState<T>["dirtyFields"]]) {
      accumulator[key] = fieldValues[key];
    }

    return accumulator;
  }, {} as FieldValues) as Partial<T>;
}

type TailwindScreen = "2xl" | "xl" | "lg" | "md" | "sm";

// i'm using default screen because of this
// i import default theme screens not my
// custom tailwind config
export function getScreenFromTailwind(screen: TailwindScreen) {
  // example -> "640px" -> split("px"): ["640",""]
  return parseInt(tailwindTheme.screens[screen].split("px")[0]);
}

export function getEntityName(entityKey: EntityKey) {
  return ENTITY_NAMES[entityKey];
}

export function formatSingularEntityName(entityName: string) {
  return entityName.endsWith("ی") ? `${entityName} ای` : `${entityName}ی`;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// i know i can use Set but remember in this project there is no
// large array to compare so there is no concern
export function isStringArraysEquals(firstArr: string[], secondArr: string[]) {
  return firstArr.every((item) => secondArr.includes(item));
}

export function createOnUploadProgress(setProgress: State<number>[1]) {
  return (progressEvent: AxiosProgressEvent) => {
    const percent =
      progressEvent.total != null
        ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
        : 0;

    setProgress(percent);
  };
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Partial<T>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result as Pick<T, K>;
}
