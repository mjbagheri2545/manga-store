import DbConfiguration from "./configuration.db";

class SharedTokenDb extends DbConfiguration {
  deleteExpiredTokens() {
    return this.prisma.token.deleteMany({
      where: { expirationTime: { lte: new Date() } },
    });
  }
}

export default SharedTokenDb;
