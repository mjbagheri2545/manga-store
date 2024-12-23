import { Prisma } from "@prisma/client";

import DbConfiguration from "./configuration.db";

class SharedUserDb extends DbConfiguration {
  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  setEmailRemainingTime(email: string, emailRemainingTime: Date) {
    return this.prisma.user.update({
      where: { email },
      data: { emailRemainingTime },
    });
  }

  resetExpiredEmailRemainingTimes() {
    return this.prisma.user.updateMany({
      where: { emailRemainingTime: { lte: new Date() } },
      data: { emailRemainingTime: null },
    });
  }
}

export default SharedUserDb;
