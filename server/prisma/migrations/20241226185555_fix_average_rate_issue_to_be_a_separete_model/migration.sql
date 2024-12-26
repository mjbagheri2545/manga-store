/*
  Warnings:

  - You are about to drop the column `averageRate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "averageRate";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- CreateTable
CREATE TABLE "ProductAverageRating" (
    "id" CHAR(36) NOT NULL,
    "rate" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "productId" CHAR(36) NOT NULL,
    "ratedById" CHAR(36) NOT NULL,

    CONSTRAINT "ProductAverageRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAverageRating_productId_key" ON "ProductAverageRating"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAverageRating_ratedById_key" ON "ProductAverageRating"("ratedById");

-- AddForeignKey
ALTER TABLE "ProductAverageRating" ADD CONSTRAINT "ProductAverageRating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAverageRating" ADD CONSTRAINT "ProductAverageRating_ratedById_fkey" FOREIGN KEY ("ratedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
