import { prisma } from "@/lib/prisma";

class SharedTokenService {
  deleteExpiredTokens() {
    return prisma.token.deleteMany({
      where: { expirationTime: { lte: new Date() } },
    });
  }
}

export const sharedTokenService = new SharedTokenService();
