import { User } from "@prisma/client";

export type ProductCommentToMap = {
  likes: {
    likedById: string;
  }[];
  dislikes: {
    dislikedById: string;
  }[];
  updatedAt: Date;
  _count: {
    replies: number;
  };
  id: string;
  createdAt: Date;
  message: string;
  author: {
    id: string;
    fullName: string;
    isVerified: boolean;
    avatarImage: string | null;
  };
};

export function mapOneProductComment<T extends ProductCommentToMap>(
  productComment: T,
  user: User
) {
  const {
    likes,
    dislikes,
    updatedAt,
    createdAt,
    _count,
    ...productCommentData
  } = productComment;
  return {
    ...productCommentData,
    updatedAt,
    createdAt,
    like: {
      count: likes.length,
      likedByMe: likes.find(({ likedById }) => likedById === user.id) != null,
    },
    dislike: {
      count: dislikes.length,
      dislikedByMe:
        dislikes.find(({ dislikedById }) => dislikedById === user.id) != null,
    },
    isEdited: updatedAt.getTime() != createdAt.getTime(),
    repliesCount: _count.replies,
  };
}

export function mapProductComments<T extends ProductCommentToMap>(
  productComments: T[],
  user: User
) {
  return productComments.map((productComment) =>
    mapOneProductComment(productComment, user)
  );
}
