-- AlterTable
ALTER TABLE "ProductComment" ADD COLUMN     "replyToId" CHAR(36);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
