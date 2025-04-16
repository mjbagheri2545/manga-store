import { createContext } from "react";

import { GetAllRootProductCommentBase } from "@/contexts/ProductContext";
import { useContextValue } from "@/hooks";
import { State } from "@/types";

export type TRootProductCommentsContext = {
  rootProductComments: GetAllRootProductCommentBase[];
  setRootProductComments: State<GetAllRootProductCommentBase[]>[1];
  handleOnCreateRootProductComment: (
    rootProductComment: GetAllRootProductCommentBase
  ) => void;
  handleOnDeleteRootProductComment: (id: string) => void;
};

export const RootProductCommentsContext =
  createContext<TRootProductCommentsContext | null>(null);

export function useRootProductComments() {
  return useContextValue(RootProductCommentsContext);
}
