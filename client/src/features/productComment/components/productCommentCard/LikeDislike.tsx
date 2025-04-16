import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { Button } from "@/components/utility";
import {
  GetAllProductCommentBaseDislike,
  GetAllProductCommentBaseLike,
  useProduct,
} from "@/contexts/ProductContext";
import { useMutation } from "@/lib/api";
import { cn } from "@/utils";

import productCommentApi, {
  ToggleDislikeResponse,
  ToggleLikeResponse,
} from "../../api";

type LikeDislikeProps = LikeSectionProps &
  DislikeSectionProps & {
    productCommentId: string;
  };

export function LikeDislike({
  like,
  dislike,
  productCommentId,
  onSuccessfulDislike,
  onSuccessfulLike,
}: LikeDislikeProps) {
  return (
    <div className="flex gap-3 items-center">
      <LikeSection
        like={like}
        productCommentId={productCommentId}
        onSuccessfulLike={onSuccessfulLike}
      />
      <DislikeSection
        dislike={dislike}
        productCommentId={productCommentId}
        onSuccessfulDislike={onSuccessfulDislike}
      />
    </div>
  );
}

type LikeSectionProps = {
  like: GetAllProductCommentBaseLike;
  onSuccessfulLike: (data: ToggleLikeResponse) => void;
  productCommentId: string;
};

function LikeSection({
  like,
  onSuccessfulLike,
  productCommentId,
}: LikeSectionProps) {
  const product = useProduct();

  const { mutate, status } = useMutation(
    () =>
      productCommentApi.toggleLike({
        id: productCommentId,
        productId: product.id,
      }),
    {
      isToastSuccessfulMessageNeed: false,
      onSuccess: ({ data }) => onSuccessfulLike(data),
    }
  );

  return (
    <div className="flex items-center">
      <Button
        variant="icon"
        className="hover:bg-transparent size-fit p-1.5"
        onClick={() => mutate()}
        disabled={status === "pending"}
      >
        <ThumbsUpIcon
          className={cn(
            "transition size-5",
            like.likedByMe ? "text-blue-600" : "text-slate-600"
          )}
        />
      </Button>
      {like.count}
    </div>
  );
}

type DislikeSectionProps = {
  dislike: GetAllProductCommentBaseDislike;
  onSuccessfulDislike: (data: ToggleDislikeResponse) => void;
  productCommentId: string;
};

function DislikeSection({
  dislike,
  onSuccessfulDislike,
  productCommentId,
}: DislikeSectionProps) {
  const product = useProduct();

  const { mutate, status } = useMutation(
    () =>
      productCommentApi.toggleDislike({
        id: productCommentId,
        productId: product.id,
      }),
    {
      isToastSuccessfulMessageNeed: false,
      onSuccess: ({ data }) => onSuccessfulDislike(data),
    }
  );

  return (
    <div className="flex items-center">
      <Button
        variant="icon"
        className="hover:bg-transparent size-fit p-1.5"
        onClick={() => mutate()}
        disabled={status === "pending"}
      >
        <ThumbsDownIcon
          className={cn(
            "transition size-5",
            dislike.dislikedByMe ? "text-blue-600" : "text-slate-600"
          )}
        />
      </Button>
      {dislike.count}
    </div>
  );
}
