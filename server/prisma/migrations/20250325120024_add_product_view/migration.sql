/*
  Warnings:

  - You are about to drop the column `views` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `walletBalance` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "views";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletBalance",
ADD COLUMN     "walletBalanceInToman" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- CreateTable
CREATE TABLE "ProductView" (
    "productId" CHAR(36) NOT NULL,
    "viewerId" CHAR(36) NOT NULL,

    CONSTRAINT "ProductView_pkey" PRIMARY KEY ("productId","viewerId")
);

-- AddForeignKey
ALTER TABLE "ProductView" ADD CONSTRAINT "ProductView_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductView" ADD CONSTRAINT "ProductView_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
