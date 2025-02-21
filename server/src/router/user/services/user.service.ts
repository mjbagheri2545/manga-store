import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { PaginateQuery } from "@/types";
import { paginate } from "@/utils";

class UserService {
  getAll(query: PaginateQuery) {
    const userSelect = {
      id: true,
      fullName: true,
      email: true,
      avatarImage: true,
      createdAt: true,
      roles: true,
      isVerified: true,
    };

    return prisma.user.findMany({
      ...paginate(query),
      select: userSelect,
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
    });
  }

  resetEmailRemainingTime(id: string) {
    return prisma.user.update({
      where: { id },
      data: { emailRemainingTime: null },
    });
  }
}

const userService = new UserService();

export default userService;
