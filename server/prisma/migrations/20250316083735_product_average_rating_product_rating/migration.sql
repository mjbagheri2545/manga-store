/*
  Warnings:

  - You are about to drop the `ProductAverageRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductAverageRating" DROP CONSTRAINT "ProductAverageRating_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAverageRating" DROP CONSTRAINT "ProductAverageRating_ratedById_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropTable
DROP TABLE "ProductAverageRating";

-- CreateTable
CREATE TABLE "ProductRating" (
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "productId" CHAR(36) NOT NULL,
    "ratedById" CHAR(36) NOT NULL,

    CONSTRAINT "ProductRating_pkey" PRIMARY KEY ("productId","ratedById")
);

-- AddForeignKey
ALTER TABLE "ProductRating" ADD CONSTRAINT "ProductRating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRating" ADD CONSTRAINT "ProductRating_ratedById_fkey" FOREIGN KEY ("ratedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
