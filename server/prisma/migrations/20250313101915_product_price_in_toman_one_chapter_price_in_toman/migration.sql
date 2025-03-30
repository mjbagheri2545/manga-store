/*
  Warnings:

  - You are about to drop the column `priceInToman` on the `Product` table. All the data in the column will be lost.
  - Added the required column `oneChapterPriceInToman` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceInToman",
ADD COLUMN     "oneChapterPriceInToman" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
