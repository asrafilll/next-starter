import { PrismaClient } from "@/generated/prisma/client"; // Adjusted import path

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: log Prisma operations
    // log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
