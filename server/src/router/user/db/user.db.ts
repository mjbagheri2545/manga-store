import SharedUserDb from "@/db/user.db";

import AccountDb from "./account.db";

class UserDb extends SharedUserDb {
  readonly account;
  constructor() {
    super();
    this.account = new AccountDb();
  }

  resetEmailRemainingTime(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { emailRemainingTime: null },
    });
  }
}

export default UserDb;
