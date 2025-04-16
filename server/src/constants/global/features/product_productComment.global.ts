export const GET_ALL_PRODUCT_COMMENTS_SELECT = {
  id: true,
  message: true,
  createdAt: true,
  updatedAt: true,
  likes: { select: { likedById: true } },
  dislikes: { select: { dislikedById: true } },
  author: {
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarImage: true,
      isVerified: true,
    },
  },
  _count: { select: { replies: true } },
};
