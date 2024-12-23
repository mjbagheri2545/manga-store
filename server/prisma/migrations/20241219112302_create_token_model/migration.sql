-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailRemainingTime" TIMESTAMP(3),
ALTER COLUMN "oldPasswords" SET DEFAULT ARRAY[]::VARCHAR(255)[];

-- CreateTable
CREATE TABLE "Token" (
    "id" VARCHAR(255) NOT NULL,
    "verificationCode" CHAR(6) NOT NULL,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
