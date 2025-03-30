/*
  Warnings:

  - You are about to drop the column `ratingCount` on the `ProductAverageRating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductAverageRating" DROP COLUMN "ratingCount";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
