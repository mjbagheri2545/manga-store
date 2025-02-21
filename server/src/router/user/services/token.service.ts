import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { StrictOmit } from "@/types";

class TokenService {
  create(userId: string, data: StrictOmit<Prisma.TokenCreateInput, "user">) {
    return prisma.token.upsert({
      where: {
        userId,
      },
      create: {
        ...data,
        user: { connect: { id: userId } },
      },
      update: data,
    });
  }

  getByUserIdAndValue(userId: string, verificationCode: string) {
    return prisma.token.findUnique({
      where: {
        userId,
        verificationCode,
      },
      select: { expirationTime: true, id: true },
    });
  }

  delete(userId: string) {
    return prisma.token.delete({
      where: { userId },
    });
  }
}

const tokenService = new TokenService();

export default tokenService;
