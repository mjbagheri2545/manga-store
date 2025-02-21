import { prisma } from "@/lib/prisma";

class SharedTokenService {
  deleteExpiredTokens() {
    return prisma.token.deleteMany({
      where: { expirationTime: { lte: new Date() } },
    });
  }
}

const sharedTokenService = new SharedTokenService();

export default sharedTokenService;
