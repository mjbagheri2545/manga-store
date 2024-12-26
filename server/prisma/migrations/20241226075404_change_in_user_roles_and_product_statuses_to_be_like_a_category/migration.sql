/*
  Warnings:

  - The values [basic,verified] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `productId` on the `ProductStatus` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'translator', 'manager', 'admin');
ALTER TABLE "User" ALTER COLUMN "roles" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "roles" TYPE "Role_new"[] USING ("roles"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::"Role"[];
COMMIT;

-- DropForeignKey
ALTER TABLE "ProductStatus" DROP CONSTRAINT "ProductStatus_productId_fkey";

-- DropIndex
DROP INDEX "ProductStatus_name_idx";

-- DropIndex
DROP INDEX "ProductStatus_productId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "statusId" CHAR(36) NOT NULL DEFAULT 'پایان یافته';

-- AlterTable
ALTER TABLE "ProductStatus" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[],
ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::"Role"[];

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProductStatus"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
