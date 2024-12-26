/*
  Warnings:

  - You are about to drop the column `rate` on the `ProductAverageRating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductAverageRating" DROP COLUMN "rate",
ADD COLUMN     "rating" DECIMAL(2,1) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
