import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { PaginateQuery } from "@/types";
import { paginate } from "@/utils";

import { USER_BASE_SELECT } from "../constants/global";

class UserService {
  getAll(query: PaginateQuery) {
    return Promise.all([
      prisma.user.findMany({
        ...paginate(query),
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
          isVerified: true,
          walletBalanceInToman: true,
        },
      }),
      prisma.user.count(),
    ]);
  }

  getManagers() {
    return prisma.user.findMany({
      where: { roles: { has: "manager" } },
      select: { id: true, fullName: true },
    });
  }

  getTranslators() {
    return prisma.user.findMany({
      where: { roles: { has: "translator" } },
      select: { id: true, fullName: true },
    });
  }

  count() {
    return prisma.user.count();
  }

  update(id: string, data: Prisma.UserUpdateInput = {}) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.user.delete({
      where: { id },
      select: USER_BASE_SELECT,
    });
  }

  resetEmailRemainingTime(id: string) {
    return prisma.user.update({
      where: { id },
      data: { emailRemainingTime: null },
      select: { id: true },
    });
  }
}

const userService = new UserService();

export default userService;
