import autoBind from "auto-bind";

import { prisma } from "@/lib/prisma";

abstract class DbConfiguration {
  protected readonly prisma;
  constructor() {
    autoBind(this);
    this.prisma = prisma;
  }

  protected selectNone() {
    return { id: true };
  }
}

export default DbConfiguration;
