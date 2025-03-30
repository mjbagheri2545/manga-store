-- DropIndex
DROP INDEX "Comment_authorId_key";

-- DropIndex
DROP INDEX "Comment_productId_key";

-- DropIndex
DROP INDEX "Like_commentId_key";

-- DropIndex
DROP INDEX "Like_likedById_key";

-- DropIndex
DROP INDEX "ProductAverageRating_productId_key";

-- DropIndex
DROP INDEX "ProductAverageRating_ratedById_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
