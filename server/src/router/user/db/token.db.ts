import { Prisma } from "@prisma/client";

import SharedTokenDb from "@/db/token.db";

class TokenDb extends SharedTokenDb {
  create(userId: string, data: Omit<Prisma.TokenCreateInput, "user">) {
    return this.prisma.token.upsert({
      where: {
        userId,
      },
      create: {
        ...data,
        user: { connect: { id: userId } },
      },
      update: data,
      select: this.selectNone(),
    });
  }

  getByUserIdAndValue(userId: string, verificationCode: string) {
    return this.prisma.token.findUnique({
      where: {
        userId,
        verificationCode,
      },
      select: { expirationTime: true, id: true },
    });
  }

  delete(userId: string) {
    return this.prisma.token.delete({
      where: { userId },
      select: this.selectNone(),
    });
  }
}

export default TokenDb;
