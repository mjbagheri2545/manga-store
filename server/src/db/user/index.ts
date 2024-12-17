import { Prisma } from "@prisma/client";

import DbConfiguration from "../configuration.db";

class UserDb extends DbConfiguration {
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
}

export default UserDb;
