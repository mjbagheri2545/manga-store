/*
  Warnings:

  - The primary key for the `ProductAverageRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductAverageRating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductAverageRating" DROP CONSTRAINT "ProductAverageRating_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductAverageRating_pkey" PRIMARY KEY ("productId", "ratedById");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
