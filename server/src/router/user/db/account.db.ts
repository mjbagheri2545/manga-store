import DbConfiguration from "@/db/configuration.db";

type UpdatePasswordOptions = {
  id: string;
  newPassword: string;
  currentPassword: string;
  isRecoverPassword: boolean;
};

class AccountDb extends DbConfiguration {
  verify(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        emailRemainingTime: null,
        Token: { delete: { userId: id } },
        isVerified: true,
      },
    });
  }

  updatePassword({
    id,
    newPassword,
    currentPassword,
    isRecoverPassword,
  }: UpdatePasswordOptions) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        oldPasswords: { push: currentPassword },
        ...(isRecoverPassword
          ? { emailRemainingTime: null, Token: { delete: { userId: id } } }
          : {}),
      },
      select: this.selectNone(),
    });
  }
}

export default AccountDb;
