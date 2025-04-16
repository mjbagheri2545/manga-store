-- CreateEnum
CREATE TYPE "ChapterStatus" AS ENUM ('public', 'private', 'purchased');

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "status" "ChapterStatus" NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::CHAR(60)[];
