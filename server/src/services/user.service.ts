import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { prismaSelectId } from "@/utils";

class SharedUserService {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  setEmailRemainingTime(email: string, emailRemainingTime: Date) {
    return prisma.user.update({
      where: { email },
      data: { emailRemainingTime },
      select: prismaSelectId(),
    });
  }

  resetExpiredEmailRemainingTimes() {
    return prisma.user.updateMany({
      where: { emailRemainingTime: { lte: new Date() } },
      data: { emailRemainingTime: null },
    });
  }
}

export const sharedUserService = new SharedUserService();
