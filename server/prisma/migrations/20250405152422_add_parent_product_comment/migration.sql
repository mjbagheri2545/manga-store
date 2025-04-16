-- AlterTable
ALTER TABLE "ProductComment" ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
