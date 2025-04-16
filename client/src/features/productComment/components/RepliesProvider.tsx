import React, { PropsWithChildren, useState } from "react";

import { GetAllReplyBase } from "../api";
import { RepliesContext, TRepliesContext } from "../contexts/RepliesContext";

type RepliesProviderChildrenProps = PropsWithChildren;

function RepliesProvider({ children }: RepliesProviderChildrenProps) {
  const contextValue = useRepliesProvider();

  return (
    <RepliesContext.Provider value={contextValue}>
      {children}
    </RepliesContext.Provider>
  );
}

const MemoizedRepliesProvider = React.memo(RepliesProvider);
export default MemoizedRepliesProvider;

function useRepliesProvider(): TRepliesContext {
  const [replies, setReplies] = useState<GetAllReplyBase[]>([]);

  function handleOnCreateReply(reply: GetAllReplyBase) {
    setReplies((current) => [...current, reply]);
  }

  function handleOnDeleteReply(id: string) {
    const newReplies = replies.filter((reply) => reply.id !== id);

    setReplies(newReplies);
  }

  return {
    replies,
    setReplies,
    handleOnCreateReply,
    handleOnDeleteReply,
  };
}
