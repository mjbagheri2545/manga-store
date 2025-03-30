/*
  Warnings:

  - You are about to drop the column `priceInRials` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `priceInToman` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- DropIndex
DROP INDEX "Product_managerId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceInRials",
ADD COLUMN     "priceInToman" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropTable
DROP TABLE "_ProductToTag";

-- CreateTable
CREATE TABLE "TagsOnProducts" (
    "tagId" CHAR(36) NOT NULL,
    "productId" CHAR(36) NOT NULL,

    CONSTRAINT "TagsOnProducts_pkey" PRIMARY KEY ("tagId","productId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" CHAR(36) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" CHAR(36) NOT NULL,
    "productId" CHAR(36) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "likedById" CHAR(36) NOT NULL,
    "commentId" CHAR(36) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("likedById","commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagsOnProducts_tagId_key" ON "TagsOnProducts"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "TagsOnProducts_productId_key" ON "TagsOnProducts"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_authorId_key" ON "Comment"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_productId_key" ON "Comment"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_likedById_key" ON "Like"("likedById");

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_key" ON "Like"("commentId");

-- CreateIndex
CREATE INDEX "Product_statusId_idx" ON "Product"("statusId");

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
