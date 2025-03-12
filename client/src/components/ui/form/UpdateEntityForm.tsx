import React from "react";
import { DefaultValues, FieldValues, FormState } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { Alert } from "@/components/utility/Alert";
import SHARED_MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import { EntityKey, ICrudApi } from "@/types";
import { getEntityName, getUpdatedFields, parseApiResponse } from "@/utils";

import ApiComponent from "../ApiComponent";
import { CrudForm, CrudFormProps } from "../crud";

type UpdateEntityFormProps<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
> = Omit<
  CrudFormProps<TFieldValues>,
  "handleOnSubmit" | "submitButtonText" | "children"
> & {
  entityKey: EntityKey;
  getFieldsDefaultValues: (
    data: TGetByIdResponse
  ) => DefaultValues<TFieldValues>;
  navigatePath?: string;
  api: Pick<
    ICrudApi<unknown, TGetByIdResponse, TFieldValues>,
    "getById" | "update"
  >;
  children: React.ReactNode | ((data: TGetByIdResponse) => React.ReactNode);
};

export function UpdateEntityForm<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
>(props: UpdateEntityFormProps<TFieldValues, TGetByIdResponse>) {
  const { id } = useParams();

  if (id == null) {
    const entityName = getEntityName(props.entityKey);

    return <Alert type="error">{`آیدی ${entityName} یافت نشد`}</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => props.api.getById({ id })}
      apiMethodOptions={{ dependencies: [id] }}
    >
      {(result) => <UpdateEntityFormChildren data={result.data} {...props} />}
    </ApiComponent>
  );
}

type UpdateEntityFormChildrenProps<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
> = UpdateEntityFormProps<TFieldValues, TGetByIdResponse> & {
  data: TGetByIdResponse;
};

function UpdateEntityFormChildren<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
>({
  data,
  api,
  entityKey,
  getFieldsDefaultValues,
  navigatePath,
  children,
  ...restProps
}: UpdateEntityFormChildrenProps<TFieldValues, TGetByIdResponse>) {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  async function handleOnSubmit(
    data: TFieldValues,
    formState: FormState<TFieldValues>
  ) {
    const dataToUpdate = getUpdatedFields(data, formState);

    if (Object.keys(dataToUpdate).length === 0) {
      toast.error(SHARED_MESSAGES.general.noFieldUpdated);
      return;
    }

    const response = await api.update({ id, data: dataToUpdate });

    parseApiResponse(response, () => {
      navigate(navigatePath ?? PATH.admin.index(entityKey));
    });
  }

  const defaultValues = getFieldsDefaultValues(data);
  const entityName = getEntityName(entityKey);

  return (
    <CrudForm
      {...restProps}
      handleOnSubmit={handleOnSubmit}
      submitButton={restProps.submitButton ?? `به‌روزرسانی ${entityName}`}
      useFormProps={{ defaultValues }}
    >
      {typeof children === "function" ? children(data) : children}
    </CrudForm>
  );
}
