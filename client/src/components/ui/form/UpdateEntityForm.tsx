import { FieldValues, FormState } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import SHARED_MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import { EntityKey, ICrudApi } from "@/types";
import { getEntityName, getUpdatedFields, parseApiResponse } from "@/utils";

import { CrudForm, CrudFormProps } from "../crud";

type UpdateEntityFormProps<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
> = Omit<CrudFormProps<TFieldValues>, "handleOnSubmit" | "submitButton"> & {
  entityKey: EntityKey;
  updateMethod: ICrudApi<unknown, TGetByIdResponse, TFieldValues>["update"];
  submitButton?: CrudFormProps<TFieldValues>["submitButton"];
};

export function UpdateEntityForm<
  TFieldValues extends FieldValues,
  TGetByIdResponse,
>({
  updateMethod,
  entityKey,
  children,
  ...restProps
}: UpdateEntityFormProps<TFieldValues, TGetByIdResponse>) {
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

    const response = await updateMethod({ id, data: dataToUpdate });

    parseApiResponse(response, () => {
      navigate(PATH.admin.info(entityKey, id));
    });
  }

  const entityName = getEntityName(entityKey);

  return (
    <CrudForm
      {...restProps}
      handleOnSubmit={handleOnSubmit}
      submitButton={restProps.submitButton ?? `به‌روزرسانی ${entityName}`}
    >
      {children}
    </CrudForm>
  );
}
