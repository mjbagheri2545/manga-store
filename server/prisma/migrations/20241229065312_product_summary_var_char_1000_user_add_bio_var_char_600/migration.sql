/*
  Warnings:

  - You are about to alter the column `summary` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "summary" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" VARCHAR(600),
ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
