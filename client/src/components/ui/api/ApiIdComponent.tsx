import React from "react";
import { useParams } from "react-router-dom";

import { Alert } from "@/components/utility";
import { ENTITY_NAMES } from "@/constants/global/general.global";
import { EntityKey } from "@/types";
import { CrudApi } from "@/utils";

import { ApiComponent } from "./ApiComponent";

type ApiIdComponentProps<T> = {
  entityName: (typeof ENTITY_NAMES)[EntityKey];
  getByIdMethod: CrudApi<unknown, T, unknown>["getById"];
  children: (data: T, id: string) => React.ReactNode;
};

export function ApiIdComponent<T>({
  entityName,
  getByIdMethod,
  children,
}: ApiIdComponentProps<T>) {
  const { id } = useParams();

  if (id == null) {
    return <Alert type="error">{`آیدی ${entityName} یافت نشد`}</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() => getByIdMethod({ id })}
      apiMethodOptions={{ dependencies: [id] }}
    >
      {(data) => children(data, id)}
    </ApiComponent>
  );
}
