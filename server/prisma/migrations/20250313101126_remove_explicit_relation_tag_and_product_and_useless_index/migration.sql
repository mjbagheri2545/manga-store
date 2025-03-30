/*
  Warnings:

  - You are about to drop the `TagsOnProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_tagId_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "Product_statusId_idx";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropTable
DROP TABLE "TagsOnProducts";

-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTag_AB_unique" ON "_ProductToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
