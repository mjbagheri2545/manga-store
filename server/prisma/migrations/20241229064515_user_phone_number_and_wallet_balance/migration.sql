-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" CHAR(11),
ADD COLUMN     "walletBalance" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
