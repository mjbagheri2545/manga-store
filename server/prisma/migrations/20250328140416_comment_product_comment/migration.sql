/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentDislike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productId_fkey";

-- DropForeignKey
ALTER TABLE "CommentDislike" DROP CONSTRAINT "CommentDislike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentDislike" DROP CONSTRAINT "CommentDislike_dislikedById_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_likedById_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentDislike";

-- DropTable
DROP TABLE "CommentLike";

-- CreateTable
CREATE TABLE "ProductComment" (
    "id" CHAR(36) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" CHAR(36) NOT NULL,
    "productId" CHAR(36) NOT NULL,

    CONSTRAINT "ProductComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCommentLike" (
    "likedById" CHAR(36) NOT NULL,
    "commentId" CHAR(36) NOT NULL,

    CONSTRAINT "ProductCommentLike_pkey" PRIMARY KEY ("likedById","commentId")
);

-- CreateTable
CREATE TABLE "ProductCommentDislike" (
    "dislikedById" CHAR(36) NOT NULL,
    "commentId" CHAR(36) NOT NULL,

    CONSTRAINT "ProductCommentDislike_pkey" PRIMARY KEY ("dislikedById","commentId")
);

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCommentLike" ADD CONSTRAINT "ProductCommentLike_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCommentLike" ADD CONSTRAINT "ProductCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ProductComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCommentDislike" ADD CONSTRAINT "ProductCommentDislike_dislikedById_fkey" FOREIGN KEY ("dislikedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCommentDislike" ADD CONSTRAINT "ProductCommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ProductComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
