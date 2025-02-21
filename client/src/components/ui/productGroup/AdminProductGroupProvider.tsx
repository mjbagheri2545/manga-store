import { PropsWithChildren } from "react";

import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";

import CrudProvider from "../crud/CrudProvider";

export function AdminProductGroupProvider({ children }: PropsWithChildren) {
  return (
    <CrudProvider Context={AdminProductGroupContext}>{children}</CrudProvider>
  );
}
