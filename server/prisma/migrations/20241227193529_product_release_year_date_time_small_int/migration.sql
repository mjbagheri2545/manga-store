/*
  Warnings:

  - Changed the type of `releaseYear` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "releaseYear",
ADD COLUMN     "releaseYear" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
