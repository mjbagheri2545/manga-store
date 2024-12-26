/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProductStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ProductStatus` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `ProductStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductStatus" ADD COLUMN     "slug" VARCHAR(50) NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- DropEnum
DROP TYPE "ProductStatusName";

-- CreateIndex
CREATE UNIQUE INDEX "ProductStatus_name_key" ON "ProductStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStatus_slug_key" ON "ProductStatus"("slug");

-- CreateIndex
CREATE INDEX "ProductStatus_name_idx" ON "ProductStatus"("name");
