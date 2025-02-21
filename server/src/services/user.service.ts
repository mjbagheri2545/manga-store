import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

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
    });
  }

  resetExpiredEmailRemainingTimes() {
    return prisma.user.updateMany({
      where: { emailRemainingTime: { lte: new Date() } },
      data: { emailRemainingTime: null },
    });
  }
}

const sharedUserService = new SharedUserService();

export default sharedUserService;
