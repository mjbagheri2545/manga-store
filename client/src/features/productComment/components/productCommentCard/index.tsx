import React, { PropsWithChildren, useState } from "react";

import { BadgeCheckIcon, ReplyIcon } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import { GetAllRootProductCommentBase } from "@/contexts/ProductContext";

import { ToggleDislikeResponse, ToggleLikeResponse } from "../../api";
import formatRelativeTime from "../../utils/relativeTime.util";
import { ProductCommentReplyForm } from "../crud/ProductCommentReplyForm";
import UpdateProductCommentForm from "../crud/UpdateProductCommentForm";
import { LikeDislike } from "./LikeDislike";
import MoreActionsMenu from "./MoreActionsMenu";

export type ProductCommentCardProps<T extends GetAllRootProductCommentBase> = {
  productComment: T;
  onSuccessfulDelete: (id: string) => void;
  replyTo?: (reply: T) => React.ReactNode;
  parentId?: string;
};

type Status = "idle" | "editing" | "replying";

export function ProductCommentCard<T extends GetAllRootProductCommentBase>({
  productComment,
  replyTo,
  onSuccessfulDelete,
  parentId,
  children,
}: ProductCommentCardProps<T> & PropsWithChildren) {
  const [status, setStatus] = useState<Status>("idle");
  const [localProductComment, setLocalProductComment] =
    useState(productComment);

  if (status === "editing") {
    return (
      <UpdateProductCommentForm
        productComment={localProductComment}
        onSuccessful={(data) => {
          setLocalProductComment((current) => ({ ...current, ...data }));
          setStatus("idle");
        }}
        onCancel={() => setStatus("idle")}
      />
    );
  }

  const handleOnSuccessfulLike = (data: ToggleLikeResponse) => {
    setLocalProductComment((current) => {
      const newProductComment = { ...current };

      if (data.addLike) {
        newProductComment.like.count += 1;
        newProductComment.like.likedByMe = true;
      } else {
        newProductComment.like.count -= 1;
        newProductComment.like.likedByMe = false;
      }

      // delete dislike is true or undefined
      if (data.deleteDislike != null) {
        newProductComment.dislike.count -= 1;
        newProductComment.dislike.dislikedByMe = false;
      }

      return newProductComment;
    });
  };

  const handleOnSuccessfulDislike = (data: ToggleDislikeResponse) => {
    setLocalProductComment((current) => {
      const newProductComment = { ...current };

      if (data.addDislike) {
        newProductComment.dislike.count += 1;
        newProductComment.dislike.dislikedByMe = true;
      } else {
        newProductComment.dislike.count -= 1;
        newProductComment.dislike.dislikedByMe = false;
      }

      // delete like is true or undefined
      if (data.deleteLike != null) {
        newProductComment.like.count -= 1;
        newProductComment.like.likedByMe = false;
      }

      return newProductComment;
    });
  };

  const toggleIsReplying = () => {
    setStatus((current) => (current === "replying" ? "idle" : "replying"));
  };

  return (
    <>
      <div className="flex w-full flex-wrap">
        <div className="flex w-full">
          <div className="ml-5 size-12">
            <Avatar user={localProductComment.author} />
          </div>
          <div className="flex gap-x-2 min-h-12 h-fit max-sm:flex-col">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-wrap flex-1">
                {localProductComment.author.fullName}
              </span>
              {localProductComment.author.isVerified && (
                <BadgeCheckIcon className="size-5 text-info" />
              )}
            </div>
            <span className="opacity-50 flex items-center text-sm">
              {localProductComment.isEdited && "به‌روزرسانی شده در"}
              {formatRelativeTime(
                localProductComment.isEdited
                  ? localProductComment.updatedAt
                  : localProductComment.createdAt
              )}
            </span>
          </div>
        </div>
        <div className="w-full mr-0 sm:mr-16 max-sm:mt-1">
          <p>
            {replyTo != null && replyTo(localProductComment)}
            {localProductComment.message}
          </p>
          <div className="mt-4 flex gap-3">
            <LikeDislike
              like={localProductComment.like}
              dislike={localProductComment.dislike}
              onSuccessfulDislike={handleOnSuccessfulDislike}
              onSuccessfulLike={handleOnSuccessfulLike}
              productCommentId={localProductComment.id}
            />
            <button
              className="bg-transparent hover:bg-slate-50/10 px-3 py-2 flex items-center transition rounded h-fit max-sm:hidden"
              onClick={toggleIsReplying}
            >
              <ReplyIcon className="ml-2 size-5" />
              پاسخ
            </button>
            <MoreActionsMenu
              onEdit={() => setStatus("editing")}
              productCommentId={localProductComment.id}
              onSuccessfulDelete={onSuccessfulDelete}
              toggleIsReplying={toggleIsReplying}
            />
            {children}
          </div>
        </div>
      </div>
      {status === "replying" && (
        // rootProductComment does not have parent
        // so the parent for the reply is also this productComment
        <ProductCommentReplyForm
          replyToId={localProductComment.author.id}
          parentId={parentId ?? localProductComment.id}
          onAfterSubmit={() => setStatus("idle")}
        />
      )}
    </>
  );
}
