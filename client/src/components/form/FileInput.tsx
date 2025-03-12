import React, { ComponentProps, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { Trash2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils";

import { Button, Tooltip } from "../utility";
import Image from "../utility/Image";
import {
  FormField_Field,
  FormField_FieldChildrenProps,
  FormField_FieldProps,
} from "./formField/field";

export type FileInputProps = Omit<
  FormField_FieldProps,
  "children" | "controllerName"
> & {
  fieldProps?: Pick<
    FileInputChildrenProps,
    "filePath" | "inputProps" | "imageProps"
  >;
  controllerName: string;
};

export function FileInput({ fieldProps, ...restProps }: FileInputProps) {
  return (
    <FormField_Field {...restProps}>
      {(props) => (
        <FileInputChildren
          {...props}
          {...fieldProps}
          controllerName={restProps.controllerName}
        />
      )}
    </FormField_Field>
  );
}

type FileInputChildrenProps = Pick<
  FormField_FieldChildrenProps,
  "id" | "isError"
> & {
  inputProps?: ComponentProps<"input">;
  controllerName: string;
  imageProps?: ComponentProps<"img">;
  filePath?: string;
};

function FileInputChildren({
  isError,
  id,
  filePath,
  inputProps,
  controllerName,
  imageProps,
}: FileInputChildrenProps) {
  const { setValue, watch } = useFormContext();

  const className = cn(
    "file-input rounded bg-dark-body max-w-lg md:max-w-none max-[520px]:max-w-[300px] max-[460px]:max-w-[230px] max-[400px]:max-w-[185px] flex-1",
    isError ? "file-input-error" : "file-input-primary",
    inputProps?.className
  );

  const file: File | undefined = watch(controllerName);
  const inputRef = useRef<HTMLInputElement>(null);

  const { progress, isUploading } = useProgress();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files == null) return;
    const file = e.target.files[0];
    setValue(controllerName, file, { shouldDirty: true, shouldValidate: true });
  }

  function handleOnRemoveFile() {
    if (inputRef.current == null) return;

    setValue(controllerName, undefined, { shouldDirty: false });
    inputRef.current.value = "";
  }

  return (
    <>
      <div className="flex items-center gap-3 justify-between">
        <input
          type="file"
          {...inputProps}
          id={id}
          className={className}
          onChange={handleOnChange}
          ref={inputRef}
        />
        {file != null && (
          <Tooltip title="حذف فایل">
            <Button
              variant="icon"
              iconType="error"
              onClick={handleOnRemoveFile}
            >
              <Trash2Icon />
            </Button>
          </Tooltip>
        )}
      </div>

      {!isError && (
        <>
          {isUploading && (
            <div className="relative w-full">
              <progress
                className="progress progress-info h-5 text-sm mt-3"
                value={progress}
                max={100}
              ></progress>
              <span className="absolute inset-0 -translate-y-[10.5px] flex items-center justify-center text-white font-bold text-sm">
                {progress}%
              </span>
              <span className="block text-slate-50/75 mt-1 text-sm">
                در حال آپلود ...
              </span>
            </div>
          )}
          {filePath != null && (
            <span className="text-secondary mt-3 break-words">{filePath}</span>
          )}
          {filePath != null && imageProps != null && (
            <Image
              {...imageProps}
              src={filePath}
              alt={imageProps.alt}
              className={twMerge(
                "max-w-md max-md:max-w-sm max-sm:max-w-60 mt-3",
                imageProps.className
              )}
            />
          )}
        </>
      )}
    </>
  );
}
