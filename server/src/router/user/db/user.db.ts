import { Prisma } from "@prisma/client";

import SharedUserDb from "@/db/user.db";
import { PaginateQuery } from "@/types";
import { paginate } from "@/utils";

import AccountDb from "./account.db";

class UserDb extends SharedUserDb {
  readonly account;
  constructor() {
    super();
    this.account = new AccountDb();
  }

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

    return this.prisma.user.findMany({
      ...paginate(query),
      select: userSelect,
    });
  }

  update(id: string, data: Prisma.UserUpdateInput = {}) {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  resetEmailRemainingTime(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { emailRemainingTime: null },
    });
  }
}

export default UserDb;
