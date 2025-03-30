/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_likedById_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "CommentLike" (
    "likedById" CHAR(36) NOT NULL,
    "commentId" CHAR(36) NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("likedById","commentId")
);

-- CreateTable
CREATE TABLE "CommentDislike" (
    "dislikedById" CHAR(36) NOT NULL,
    "commentId" CHAR(36) NOT NULL,

    CONSTRAINT "CommentDislike_pkey" PRIMARY KEY ("dislikedById","commentId")
);

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDislike" ADD CONSTRAINT "CommentDislike_dislikedById_fkey" FOREIGN KEY ("dislikedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDislike" ADD CONSTRAINT "CommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
