import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { State } from "@/types";

import { GetAllReplyBase } from "../api";

export type TRepliesContext = {
  replies: GetAllReplyBase[];
  setReplies: State<GetAllReplyBase[]>[1];
  handleOnCreateReply: (reply: GetAllReplyBase) => void;
  handleOnDeleteReply: (id: string) => void;
};

export const RepliesContext = createContext<TRepliesContext | null>(null);

export function useReplies() {
  return useContextValue(RepliesContext);
}
