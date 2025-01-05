import { prisma } from "@/lib/prisma";

type UpdatePasswordOptions = {
  id: string;
  newPassword: string;
  currentPassword: string;
  isRecoverPassword: boolean;
};

class UserAccountService {
  verify(id: string) {
    return prisma.user.update({
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
    return prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        oldPasswords: { push: currentPassword },
        ...(isRecoverPassword
          ? { emailRemainingTime: null, Token: { delete: { userId: id } } }
          : {}),
      },
    });
  }
}

const userAccountService = new UserAccountService();

export default userAccountService;
