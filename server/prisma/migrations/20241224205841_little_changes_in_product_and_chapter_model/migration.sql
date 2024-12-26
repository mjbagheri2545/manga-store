/*
  Warnings:

  - You are about to alter the column `averageRate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "averageRate" SET DEFAULT 0,
ALTER COLUMN "averageRate" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
