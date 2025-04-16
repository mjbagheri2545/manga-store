import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type GetUserByIdOptions = Omit<Prisma.UserFindUniqueArgs, "where">;

class SharedUserService {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  getById(id: string, options: GetUserByIdOptions = { select: { id: true } }) {
    return prisma.user.findUnique({
      where: { id },
      ...options,
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
