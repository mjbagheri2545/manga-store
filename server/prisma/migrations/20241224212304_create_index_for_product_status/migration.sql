-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- CreateIndex
CREATE INDEX "ProductStatus_name_idx" ON "ProductStatus"("name");
