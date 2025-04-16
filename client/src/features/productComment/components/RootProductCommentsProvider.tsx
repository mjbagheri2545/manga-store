import { PropsWithChildren, useState } from "react";

import { GetAllRootProductCommentBase } from "@/contexts/ProductContext";

import {
  RootProductCommentsContext,
  TRootProductCommentsContext,
} from "../contexts/RootProductCommentsContext";

type RootProductCommentsProviderProps = PropsWithChildren & {
  rootProductComments?: GetAllRootProductCommentBase[];
};

function RootProductCommentsProvider({
  children,
  rootProductComments,
}: RootProductCommentsProviderProps) {
  const contextValue = useRootProductCommentsProvider({ rootProductComments });

  return (
    <RootProductCommentsContext.Provider value={contextValue}>
      {children}
    </RootProductCommentsContext.Provider>
  );
}

export default RootProductCommentsProvider;

type UseRootProductCommentsProviderOptions = {
  rootProductComments?: GetAllRootProductCommentBase[];
};

function useRootProductCommentsProvider(
  options: UseRootProductCommentsProviderOptions
): TRootProductCommentsContext {
  const [rootProductComments, setRootProductComments] = useState<
    GetAllRootProductCommentBase[]
  >(options.rootProductComments ?? []);

  function handleOnCreateRootProductComment(
    rootProductComment: GetAllRootProductCommentBase
  ) {
    setRootProductComments((current) => [...current, rootProductComment]);
  }

  function handleOnDeleteRootProductComment(id: string) {
    const newRootProductComments = rootProductComments.filter(
      (rootProductComment) => rootProductComment.id !== id
    );

    setRootProductComments(newRootProductComments);
  }

  return {
    rootProductComments,
    setRootProductComments,
    handleOnCreateRootProductComment,
    handleOnDeleteRootProductComment,
  };
}
